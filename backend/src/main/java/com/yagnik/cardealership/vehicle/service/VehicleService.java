package com.yagnik.cardealership.vehicle.service;

import com.yagnik.cardealership.vehicle.dto.VehicleRequest;
import com.yagnik.cardealership.vehicle.dto.VehicleResponse;

import java.math.BigDecimal;
import java.util.List;

public interface VehicleService {

    VehicleResponse addVehicle(VehicleRequest request);
    List<VehicleResponse> getAllVehicles();
    VehicleResponse getVehicleById(Long id);
    VehicleResponse updateVehicle(Long id, VehicleRequest request);
    void deleteVehicle(Long id);
    List<VehicleResponse> searchByMake(String make);

    List<VehicleResponse> searchByCategory(String category);
    VehicleResponse restockVehicle(Long id, Integer quantity);
    List<VehicleResponse> searchByModel(String model);
    VehicleResponse purchaseVehicle(Long id);
    List<VehicleResponse> searchByPriceRange(BigDecimal minPrice,BigDecimal maxPrice);
}