// src/main/java/com/itvedant/bloodbankmanagement/repository/BloodStockRepository.java

package com.itvedant.bloodbankmanagement.repository;

import com.itvedant.bloodbankmanagement.entity.BloodStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional; // Import Optional

@Repository
public interface BloodStockRepository extends JpaRepository<BloodStock, Long> {
    // New method to find a BloodStock entry by its bloodGroup
    Optional<BloodStock> findByBloodGroup(String bloodGroup);
}