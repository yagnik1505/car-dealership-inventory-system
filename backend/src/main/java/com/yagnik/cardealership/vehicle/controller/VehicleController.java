package com.yagnik.cardealership.vehicle.controller;

import com.yagnik.cardealership.vehicle.dto.VehicleRequest;
import com.yagnik.cardealership.vehicle.dto.VehicleResponse;
import com.yagnik.cardealership.vehicle.service.VehicleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    @PostMapping
    public ResponseEntity<VehicleResponse> addVehicle(
            @Valid @RequestBody VehicleRequest request) {

        VehicleResponse response = vehicleService.addVehicle(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<VehicleResponse>> getAllVehicles() {

        return ResponseEntity.ok(vehicleService.getAllVehicles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehicleResponse> getVehicleById(@PathVariable Long id) {

        return ResponseEntity.ok(vehicleService.getVehicleById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VehicleResponse> updateVehicle(
            @PathVariable Long id,
            @Valid @RequestBody VehicleRequest request) {

        return ResponseEntity.ok(vehicleService.updateVehicle(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {

        vehicleService.deleteVehicle(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<VehicleResponse>> searchVehicles(
            @RequestParam(required = false) String make,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice) {

        if (make != null) {
            return ResponseEntity.ok(vehicleService.searchByMake(make));
        }

        if (model != null) {
            return ResponseEntity.ok(vehicleService.searchByModel(model));
        }

        if (category != null) {
            return ResponseEntity.ok(vehicleService.searchByCategory(category));
        }

        if (minPrice != null && maxPrice != null) {
            return ResponseEntity.ok(vehicleService.searchByPriceRange(minPrice, maxPrice));
        }

        return ResponseEntity.ok(List.of());
    }
}

//feat(vehicle): implement update vehicle endpoint