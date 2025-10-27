package com.itvedant.bloodbankmanagement.controller;

import com.itvedant.bloodbankmanagement.entity.BloodRequest;
import com.itvedant.bloodbankmanagement.service.BloodRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bloodrequests")
public class BloodRequestController {

    @Autowired
    private BloodRequestService bloodRequestService;

    @GetMapping
    public List<BloodRequest> getAllRequests() {
        return bloodRequestService.getAllRequests();
    }

    @GetMapping("/{id}")
    public BloodRequest getRequestById(@PathVariable Long id) {
        return bloodRequestService.getRequestById(id);
    }

    @PostMapping
    public BloodRequest createRequest(@RequestBody BloodRequest request) {
        return bloodRequestService.createRequest(request);
    }

    @PutMapping("/{id}")
    public BloodRequest updateRequest(@PathVariable Long id, @RequestBody BloodRequest requestDetails) {
        return bloodRequestService.updateRequest(id, requestDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteRequest(@PathVariable Long id) {
        bloodRequestService.deleteRequest(id);
    }
    
    @PostMapping("/{id}/fulfill")
    public ResponseEntity<BloodRequest> fulfillRequest(@PathVariable Long id) {
        BloodRequest fulfilledRequest = bloodRequestService.fulfillRequest(id);
        if (fulfilledRequest != null && "Fulfilled".equals(fulfilledRequest.getStatus())) {
            return ResponseEntity.ok(fulfilledRequest);
        }
        return ResponseEntity.badRequest().body(fulfilledRequest); // Return a bad request if fulfillment fails
    }
}
