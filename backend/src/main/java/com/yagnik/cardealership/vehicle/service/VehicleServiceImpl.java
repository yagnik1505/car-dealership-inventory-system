package com.yagnik.cardealership.vehicle.service;

import com.yagnik.cardealership.vehicle.dto.VehicleRequest;
import com.yagnik.cardealership.vehicle.dto.VehicleResponse;
import com.yagnik.cardealership.vehicle.entity.Vehicle;
import com.yagnik.cardealership.vehicle.exception.DuplicateVehicleException;
import com.yagnik.cardealership.vehicle.exception.VehicleNotFoundException;
import com.yagnik.cardealership.vehicle.exception.VehicleOutOfStockException;
import com.yagnik.cardealership.vehicle.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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

        return mapToResponse(savedVehicle);
    }

    @Override
    public List<VehicleResponse> getAllVehicles() {

        return vehicleRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public VehicleResponse getVehicleById(Long id) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new VehicleNotFoundException("Vehicle not found"));

        return mapToResponse(vehicle);
    }

    @Override
    public VehicleResponse updateVehicle(Long id,
                                         VehicleRequest request) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new VehicleNotFoundException("Vehicle not found"));

        vehicle.setMake(request.getMake());
        vehicle.setModel(request.getModel());
        vehicle.setCategory(request.getCategory());
        vehicle.setPrice(request.getPrice());
        vehicle.setQuantityInStock(request.getQuantityInStock());

        Vehicle updatedVehicle = vehicleRepository.save(vehicle);

        return mapToResponse(updatedVehicle);
    }

    @Override
    public void deleteVehicle(Long id) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new VehicleNotFoundException("Vehicle not found"));

        vehicleRepository.delete(vehicle);
    }

    @Override
    public List<VehicleResponse> searchByMake(String make) {

        return vehicleRepository.findByMakeIgnoreCase(make)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<VehicleResponse> searchByCategory(String category) {

        return vehicleRepository.findByCategoryIgnoreCase(category)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<VehicleResponse> searchByModel(String model) {

        return vehicleRepository.findByModelIgnoreCase(model)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<VehicleResponse> searchByPriceRange(BigDecimal minPrice,
                                                    BigDecimal maxPrice) {

        return vehicleRepository.findByPriceBetween(minPrice, maxPrice)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private VehicleResponse mapToResponse(Vehicle vehicle) {

        return VehicleResponse.builder()
                .id(vehicle.getId())
                .make(vehicle.getMake())
                .model(vehicle.getModel())
                .category(vehicle.getCategory())
                .price(vehicle.getPrice())
                .quantityInStock(vehicle.getQuantityInStock())
                .build();
    }

    @Override
    public VehicleResponse purchaseVehicle(Long id) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new VehicleNotFoundException("Vehicle not found"));

        if (vehicle.getQuantityInStock() <= 0) {
            throw new VehicleOutOfStockException("Vehicle is out of stock");
        }

        vehicle.setQuantityInStock(
                vehicle.getQuantityInStock() - 1);

        Vehicle updatedVehicle = vehicleRepository.save(vehicle);

        return mapToResponse(updatedVehicle);
    }

    @Override
    public VehicleResponse restockVehicle(Long id,
                                          Integer quantity) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new VehicleNotFoundException("Vehicle not found"));

        vehicle.setQuantityInStock(
                vehicle.getQuantityInStock() + quantity);

        Vehicle updatedVehicle = vehicleRepository.save(vehicle);

        return mapToResponse(updatedVehicle);
    }
}