package com.itvedant.bloodbankmanagement.service;

import com.itvedant.bloodbankmanagement.entity.Donor;
import com.itvedant.bloodbankmanagement.repository.DonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DonorServiceImpl implements DonorService {

    @Autowired
    private DonorRepository donorRepository;

    @Override
    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }

    @Override
    public Donor getDonorById(Long id) {
        return donorRepository.findById(id).orElse(null);
    }

    @Override
    public Donor createDonor(Donor donor) {
        return donorRepository.save(donor);
    }

    @Override
    public Donor updateDonor(Long id, Donor donorDetails) {
        Donor donor = donorRepository.findById(id).orElse(null);
        if (donor != null) {
            donor.setName(donorDetails.getName());
            donor.setBloodGroup(donorDetails.getBloodGroup());
            donor.setLocation(donorDetails.getLocation());
            donor.setLastDonationDate(donorDetails.getLastDonationDate());
            return donorRepository.save(donor);
        }
        return null;
    }

    @Override
    public void deleteDonor(Long id) {
        donorRepository.deleteById(id);
    }
}

