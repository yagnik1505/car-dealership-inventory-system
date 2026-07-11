package com.yagnik.cardealership.vehicle.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleRequest {

    private String make;

    private String model;

    private String category;

    private BigDecimal price;

    private Integer quantityInStock;
}