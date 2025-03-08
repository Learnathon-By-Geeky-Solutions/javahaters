package com.javahaters.medtoheal.service;

import com.javahaters.medtoheal.model.Doctor;
import com.javahaters.medtoheal.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    // Get all doctors
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    // Get a doctor by id
    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id " + id));
    }


    // Search doctors by name
    public List<Doctor> searchDoctorsByName(String name) {
        return doctorRepository.findByNameContainingIgnoreCase(name);
    }

    // Search doctors by specialtyId
    public List<Doctor> searchDoctorsBySpecialty(Long specialtyId) {
        return doctorRepository.findBySpecialityId(specialtyId);
    }

    // Search doctors by name and sort by experience
    public List<Doctor> searchDoctorsByNameAndSortByExperience(String name) {
        return doctorRepository.findByNameContainingIgnoreCaseOrderByExperienceDesc(name);
    }

    // Search doctors by name and specialtyId
    public List<Doctor> searchDoctorsByNameAndSpecialty(String name, Long specialtyId) {
        return doctorRepository.findByNameAndSpecialty(name, specialtyId);
    }

    // Add a new doctor (with validation)
    public Doctor addDoctor(Doctor doctor) {
        if (doctor.getName() == null || doctor.getName().isEmpty()) {
            throw new IllegalArgumentException("Doctor name cannot be null or empty.");
        }
        if (doctor.getSpecialityId() == null) {
            throw new IllegalArgumentException("Specialty ID is required.");
        }
        return doctorRepository.save(doctor);
    }

    // Update a doctor
    public Doctor updateDoctor(Long id, Doctor doctorDetails) {
        Optional<Doctor> optionalDoctor = doctorRepository.findById(id);
        if (optionalDoctor.isEmpty()) {
            throw new RuntimeException("Doctor not found with id " + id);
        }

        Doctor doctor = optionalDoctor.get();
        if (doctorDetails.getName() != null) {
            doctor.setName(doctorDetails.getName());
        }
        if (doctorDetails.getSpecialityId() != null) {
            doctor.setSpecialityId(doctorDetails.getSpecialityId());
        }
        if (doctorDetails.getVisitFee() != null) {
            doctor.setVisitFee(doctorDetails.getVisitFee());
        }
        if (doctorDetails.getDegree() != null) {
            doctor.setDegree(doctorDetails.getDegree());
        }
        if (doctorDetails.getAvailableHours() != null) {
            doctor.setAvailableHours(doctorDetails.getAvailableHours());
        }

        return doctorRepository.save(doctor);
    }

    // Delete a doctor
    public void deleteDoctor(Long id) {
        if (!doctorRepository.existsById(id)) {
            throw new RuntimeException("Doctor not found with id " + id);
        }
        doctorRepository.deleteById(id);
    }
}
