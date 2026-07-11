package com.yagnik.cardealership.vehicle.service;

import com.yagnik.cardealership.vehicle.dto.VehicleRequest;
import com.yagnik.cardealership.vehicle.dto.VehicleResponse;

import java.util.List;

public interface VehicleService {

    VehicleResponse addVehicle(VehicleRequest request);
    List<VehicleResponse> getAllVehicles();
}