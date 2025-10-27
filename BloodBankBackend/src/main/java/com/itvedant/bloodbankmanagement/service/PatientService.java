package com.itvedant.bloodbankmanagement.service;

import com.itvedant.bloodbankmanagement.entity.Patient;
import java.util.List;

public interface PatientService {
    List<Patient> getAllPatients();
    Patient getPatientById(Long id);
    Patient createPatient(Patient patient);
    Patient updatePatient(Long id, Patient patientDetails);
    void deletePatient(Long id);
}

