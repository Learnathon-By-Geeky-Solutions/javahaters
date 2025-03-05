package com.javahaters.medtoheal.controller;

import com.javahaters.medtoheal.model.Doctor;
import com.javahaters.medtoheal.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    // Get all doctors
    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        List<Doctor> doctors = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctors);
    }

    // Search doctors by name or specialtyId (updated to specialtyId), and sort by experience
    @GetMapping("/search")
    public ResponseEntity<List<Doctor>> searchDoctors(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Integer specialtyId,
            @RequestParam(required = false) String sortBy) {

        if (name != null && specialtyId != null) {
            // Search by name and specialtyId
            return ResponseEntity.ok(doctorService.searchDoctorsByNameAndSpecialty(name, specialtyId));
        } else if (name != null && "experience".equalsIgnoreCase(sortBy)) {
            // Search by name and sort by experience
            return ResponseEntity.ok(doctorService.searchDoctorsByNameAndSortByExperience(name));
        } else if (name != null) {
            // Search by name
            return ResponseEntity.ok(doctorService.searchDoctorsByName(name));
        } else if (specialtyId != null) {
            // Search by specialtyId
            return ResponseEntity.ok(doctorService.searchDoctorsBySpecialty(specialtyId));
        } else {
            // Return all doctors if no search parameters are provided
            return ResponseEntity.ok(doctorService.getAllDoctors());
        }
    }

    // Add a new doctor
    @PostMapping
    public ResponseEntity<Doctor> addDoctor(@RequestBody Doctor doctor) {
        Doctor savedDoctor = doctorService.addDoctor(doctor);
        return ResponseEntity.ok(savedDoctor);
    }

    // Update a doctor
    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @RequestBody Doctor doctorDetails) {
        Doctor updatedDoctor = doctorService.updateDoctor(id, doctorDetails);
        return ResponseEntity.ok(updatedDoctor);
    }

    // Delete a doctor
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.noContent().build();  // Return 204 No Content
    }
}
