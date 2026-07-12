package com.yagnik.cardealership.vehicle.repository;

import com.yagnik.cardealership.vehicle.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.List;

public interface VehicleRepository
        extends JpaRepository<Vehicle, Long> {

    boolean existsByMakeAndModelAndCategory(
            String make,
            String model,
            String category
    );

    List<Vehicle> findByMakeIgnoreCase(String make);

    List<Vehicle> findByCategoryIgnoreCase(String category);

    List<Vehicle> findByModelIgnoreCase(String model);

    List<Vehicle> findByPriceBetween(BigDecimal minPrice,BigDecimal maxPrice);
}