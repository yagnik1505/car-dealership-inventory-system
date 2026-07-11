package com.yagnik.cardealership.vehicle.service;

import com.yagnik.cardealership.vehicle.dto.VehicleRequest;
import com.yagnik.cardealership.vehicle.dto.VehicleResponse;
import com.yagnik.cardealership.vehicle.entity.Vehicle;
import com.yagnik.cardealership.vehicle.exception.DuplicateVehicleException;
import com.yagnik.cardealership.vehicle.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository vehicleRepository;

    @Override
    public VehicleResponse addVehicle(VehicleRequest request) {

        if (vehicleRepository.existsByMakeAndModelAndCategory(
                request.getMake(),
                request.getModel(),
                request.getCategory())) {

            throw new DuplicateVehicleException("Vehicle already exists");
        }

        Vehicle vehicle = Vehicle.builder()
                .make(request.getMake())
                .model(request.getModel())
                .category(request.getCategory())
                .price(request.getPrice())
                .quantityInStock(request.getQuantityInStock())
                .build();

        Vehicle savedVehicle = vehicleRepository.save(vehicle);

        return VehicleResponse.builder()
                .id(savedVehicle.getId())
                .make(savedVehicle.getMake())
                .model(savedVehicle.getModel())
                .category(savedVehicle.getCategory())
                .price(savedVehicle.getPrice())
                .quantityInStock(savedVehicle.getQuantityInStock())
                .build();
    }

    @Override
    public List<VehicleResponse> getAllVehicles() {

        return vehicleRepository.findAll()
                .stream()
                .map(vehicle -> VehicleResponse.builder()
                        .id(vehicle.getId())
                        .make(vehicle.getMake())
                        .model(vehicle.getModel())
                        .category(vehicle.getCategory())
                        .price(vehicle.getPrice())
                        .quantityInStock(vehicle.getQuantityInStock())
                        .build())
                .toList();
    }
}