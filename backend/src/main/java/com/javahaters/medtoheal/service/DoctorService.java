package com.javahaters.medtoheal.service;

import com.javahaters.medtoheal.model.Doctor;
import com.javahaters.medtoheal.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    // Get all doctors
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    // Search doctors by name
    public List<Doctor> searchDoctorsByName(String name) {
        return doctorRepository.findByNameContainingIgnoreCase(name);
    }

    // Search doctors by specialtyId (updated to specialtyId)
    public List<Doctor> searchDoctorsBySpecialty(Integer specialtyId) {
        return doctorRepository.findBySpecialityId(Long.valueOf(specialtyId));
    }

    // Search doctors by name and sort by experience
    public List<Doctor> searchDoctorsByNameAndSortByExperience(String name) {
        return doctorRepository.findByNameContainingIgnoreCaseOrderByExperienceDesc(name);
    }

    // Search doctors by name and specialtyId (updated to specialtyId)
    public List<Doctor> searchDoctorsByNameAndSpecialty(String name, Integer specialtyId) {
        return doctorRepository.findByNameAndSpecialty(name, Long.valueOf(specialtyId));
    }

    // Add a new doctor
    public Doctor addDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    // Update a doctor
    public Doctor updateDoctor(Long id, Doctor doctorDetails) {
        return doctorRepository.findById(id).map(doctor -> {
            doctor.setName(doctorDetails.getName());
            doctor.setSpecialityId(doctorDetails.getSpecialityId()); // Updated from setSpecialty to setSpecialityId
            doctor.setVisitFee(doctorDetails.getVisitFee());
            doctor.setDegree(doctorDetails.getDegree());
            doctor.setAvailableHours(doctorDetails.getAvailableHours());
            return doctorRepository.save(doctor);
        }).orElseThrow(() -> new RuntimeException("Doctor not found with id " + id));
    }

    // Delete a doctor
    public void deleteDoctor(Long id) {
        Doctor doctor = doctorRepository.findById(id).orElseThrow(() -> new RuntimeException("Doctor not found with id " + id));
        doctorRepository.delete(doctor);
    }
}
