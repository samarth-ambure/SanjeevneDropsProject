package com.itvedant.bloodbankmanagement.entity;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String bloodGroupRequired;

    private String hospitalName;

    private String location;

    // Relation: One patient can have multiple blood requests
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("patient")
    private List<BloodRequest> bloodRequests;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBloodGroupRequired() {
        return bloodGroupRequired;
    }

    public void setBloodGroupRequired(String bloodGroupRequired) {
        this.bloodGroupRequired = bloodGroupRequired;
    }

    public String getHospitalName() {
        return hospitalName;
    }

    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<BloodRequest> getBloodRequests() {
        return bloodRequests;
    }

    public void setBloodRequests(List<BloodRequest> bloodRequests) {
        this.bloodRequests = bloodRequests;
    }
}

