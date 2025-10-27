package com.itvedant.bloodbankmanagement.repository;

import com.itvedant.bloodbankmanagement.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
}

