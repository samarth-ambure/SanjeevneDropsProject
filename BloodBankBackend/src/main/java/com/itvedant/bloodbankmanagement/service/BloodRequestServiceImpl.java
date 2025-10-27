// src/main/java/com/itvedant/bloodbankmanagement/service/BloodRequestServiceImpl.java

package com.itvedant.bloodbankmanagement.service;

import com.itvedant.bloodbankmanagement.entity.BloodRequest;
import com.itvedant.bloodbankmanagement.entity.BloodStock; // NEW
import com.itvedant.bloodbankmanagement.repository.BloodRequestRepository;
import com.itvedant.bloodbankmanagement.repository.BloodStockRepository; // NEW

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional; // NEW

@Service
public class BloodRequestServiceImpl implements BloodRequestService {

    @Autowired
    private BloodRequestRepository bloodRequestRepository;

    @Autowired
    private BloodStockRepository bloodStockRepository; // NEW: Inject BloodStockRepository

    @Override
    public List<BloodRequest> getAllRequests() {
        return bloodRequestRepository.findAll();
    }

    @Override
    public BloodRequest getRequestById(Long id) {
        return bloodRequestRepository.findById(id).orElse(null);
    }

    // NEW LOGIC IN CREATE METHOD
    @Override
    public BloodRequest createRequest(BloodRequest request) {
        // Step 1: Check if the required blood is in stock
        Optional<BloodStock> optionalBloodStock = bloodStockRepository.findByBloodGroup(request.getBloodGroup());

        if (optionalBloodStock.isPresent()) {
            BloodStock bloodStock = optionalBloodStock.get();
            if (bloodStock.getAvailableUnits() >= request.getUnitsRequired()) {
                // Step 2: If enough units are available, approve the request and decrement stock
                bloodStock.setAvailableUnits(bloodStock.getAvailableUnits() - request.getUnitsRequired());
                bloodStockRepository.save(bloodStock); // Save the updated stock
                request.setStatus("Approved"); // Update the request status to Approved
            } else {
                // Step 3: If not enough units, the request remains pending
                request.setStatus("Pending");
            }
        } else {
            // Step 4: If no stock entry exists for this blood group, it's also pending
            request.setStatus("Pending");
        }
        
        return bloodRequestRepository.save(request); // Save the new request with its determined status
    }
    
    // The rest of your methods are fine as they are for this implementation.
    // For a more complete system, you might want to add similar inventory logic to the update method.

    @Override
    public BloodRequest updateRequest(Long id, BloodRequest requestDetails) {
        BloodRequest existingRequest = bloodRequestRepository.findById(id).orElse(null);
        if (existingRequest != null) {
            existingRequest.setBloodGroup(requestDetails.getBloodGroup());
            existingRequest.setUnitsRequired(requestDetails.getUnitsRequired());
            existingRequest.setStatus(requestDetails.getStatus());
            existingRequest.setPatient(requestDetails.getPatient());
            return bloodRequestRepository.save(existingRequest);
        }
        return null;
    }

    @Override
    public void deleteRequest(Long id) {
        bloodRequestRepository.deleteById(id);
    }
    @Override
    @Transactional
    public BloodRequest fulfillRequest(Long id) {
        BloodRequest requestToFulfill = getRequestById(id);

        if (requestToFulfill != null && "Approved".equals(requestToFulfill.getStatus())) {
            Optional<BloodStock> optionalBloodStock = bloodStockRepository.findByBloodGroup(requestToFulfill.getBloodGroup());
            
            if (optionalBloodStock.isPresent()) {
                BloodStock bloodStock = optionalBloodStock.get();
                // Final check to make sure stock is still available before decrementing
                if (bloodStock.getAvailableUnits() >= requestToFulfill.getUnitsRequired()) {
                    // Decrement the units from the stock
                    bloodStock.setAvailableUnits(bloodStock.getAvailableUnits() - requestToFulfill.getUnitsRequired());
                    bloodStockRepository.save(bloodStock);
                    
                    // Mark the request as fulfilled
                    requestToFulfill.setStatus("Fulfilled");
                    return bloodRequestRepository.save(requestToFulfill);
                }
            }
        }
        // If the request isn't found, not approved, or stock is insufficient, return the existing request or throw an error.
        return requestToFulfill;
    }
}