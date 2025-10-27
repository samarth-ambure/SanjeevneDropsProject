package com.itvedant.bloodbankmanagement.repository;

import com.itvedant.bloodbankmanagement.entity.BloodRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BloodRequestRepository extends JpaRepository<BloodRequest, Long> {
}
