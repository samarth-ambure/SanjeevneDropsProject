package com.itvedant.bloodbankmanagement.service;

import com.itvedant.bloodbankmanagement.entity.Donor;
import java.util.List;

public interface DonorService {
    List<Donor> getAllDonors();
    Donor getDonorById(Long id);
    Donor createDonor(Donor donor);
    Donor updateDonor(Long id, Donor donorDetails);
    void deleteDonor(Long id);
}

