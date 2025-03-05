package com.javahaters.medtoheal.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "doctors")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "area_id", nullable = false)
    private Long areaId; // Area ID as Long

    @Column(name = "hospital_id", nullable = false)
    private Long hospitalId;

    @Column(name = "visit_fee", nullable = false)
    private Double visitFee;

    @Column(name = "available_hours", nullable = false)
    private String availableHours;

    @Column(name = "degree", nullable = false)
    private String degree;

    @Column(name = "speciality_id", nullable = false)
    private Long specialityId; // Changed from String specialty to Long specialityId

    @Column(nullable = false)
    private Integer experience; // Years of experience

    // You can remove the setArea method as it's no longer relevant if you're using areaId

}
