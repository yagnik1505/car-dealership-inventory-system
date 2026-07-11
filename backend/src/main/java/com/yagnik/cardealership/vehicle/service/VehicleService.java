package com.yagnik.cardealership.vehicle.service;

import com.yagnik.cardealership.vehicle.dto.VehicleRequest;
import com.yagnik.cardealership.vehicle.dto.VehicleResponse;

public interface VehicleService {

    VehicleResponse addVehicle(VehicleRequest request);

}