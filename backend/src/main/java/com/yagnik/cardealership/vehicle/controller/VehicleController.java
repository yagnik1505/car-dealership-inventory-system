package com.yagnik.cardealership.vehicle.controller;

import com.yagnik.cardealership.vehicle.dto.VehicleRequest;
import com.yagnik.cardealership.vehicle.dto.VehicleResponse;
import com.yagnik.cardealership.vehicle.service.VehicleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}