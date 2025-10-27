package com.itvedant.bloodbankmanagement.service;

import com.itvedant.bloodbankmanagement.entity.BloodRequest;
import java.util.List;

public interface BloodRequestService {
    List<BloodRequest> getAllRequests();
    BloodRequest getRequestById(Long id);
    BloodRequest createRequest(BloodRequest request);
    BloodRequest updateRequest(Long id, BloodRequest requestDetails);
    void deleteRequest(Long id);
    
    BloodRequest fulfillRequest(Long id);
}

