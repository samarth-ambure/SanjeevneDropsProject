package com.itvedant.bloodbankmanagement.service;

import com.itvedant.bloodbankmanagement.entity.Patient;
import com.itvedant.bloodbankmanagement.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id).orElse(null);
    }

    @Override
    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public Patient updatePatient(Long id, Patient patientDetails) {
        Patient patient = patientRepository.findById(id).orElse(null);
        if (patient != null) {
            patient.setName(patientDetails.getName());
            patient.setBloodGroupRequired(patientDetails.getBloodGroupRequired());
            patient.setHospitalName(patientDetails.getHospitalName());
            patient.setLocation(patientDetails.getLocation());
            return patientRepository.save(patient);
        }
        return null;
    }

    @Override
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}

