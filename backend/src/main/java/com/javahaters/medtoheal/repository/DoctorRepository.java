package com.javahaters.medtoheal.repository;

import com.javahaters.medtoheal.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    // Search by name
    List<Doctor> findByNameContainingIgnoreCase(String name);

    // Search by specialtyId (updated from specialty)
    List<Doctor> findBySpecialityId(Long specialityId);

    // Search by name and sort by experience
    List<Doctor> findByNameContainingIgnoreCaseOrderByExperienceDesc(String name);

    // Search by name and specialtyId
    @Query("SELECT d FROM Doctor d WHERE LOWER(d.name) LIKE LOWER(CONCAT('%', :name, '%')) AND d.specialityId = :specialityId")
    List<Doctor> findByNameAndSpecialty(@Param("name") String name, @Param("specialityId") Long specialityId);

    // Search by area ID
    List<Doctor> findByAreaId(Long areaId);

    // Search by hospital ID
    List<Doctor> findByHospitalId(Long hospitalId);

    // Search by area ID and specialtyId
    List<Doctor> findByAreaIdAndSpecialityId(Long areaId, Long specialityId);
}
