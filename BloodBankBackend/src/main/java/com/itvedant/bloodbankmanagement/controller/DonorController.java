package com.itvedant.bloodbankmanagement.controller;

import com.itvedant.bloodbankmanagement.entity.Donor;
import com.itvedant.bloodbankmanagement.service.DonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donors")
public class DonorController {

    @Autowired
    private DonorService donorService;

    @GetMapping
    public List<Donor> getAllDonors() {
        return donorService.getAllDonors();
    }

    @GetMapping("/{id}")
    public Donor getDonorById(@PathVariable Long id) {
        return donorService.getDonorById(id);
    }

    @PostMapping
    public Donor createDonor(@RequestBody Donor donor) {
        return donorService.createDonor(donor);
    }

    @PutMapping("/{id}")
    public Donor updateDonor(@PathVariable Long id, @RequestBody Donor donorDetails) {
        return donorService.updateDonor(id, donorDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteDonor(@PathVariable Long id) {
        donorService.deleteDonor(id);
    }
}

