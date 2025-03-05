package com.javahaters.medtoheal.dto;

import lombok.Data;

@Data
public class DoctorDTO {
    private String name;
    private String area; // You can keep this as a String or modify to a complex object if necessary
    private Long hospitalId; // Changed from Integer to Long if your Hospital ID is a long
    private Double visitFee;
    private String availableHours;
    private String degree;
    private Long specialityId; // Changed from Integer to Long assuming speciality_id is Long in the DB
    private Integer experience;
}
