package com.yagnik.cardealership.vehicle.service;

import com.yagnik.cardealership.vehicle.dto.VehicleRequest;
import com.yagnik.cardealership.vehicle.dto.VehicleResponse;
import com.yagnik.cardealership.vehicle.entity.Vehicle;
import com.yagnik.cardealership.vehicle.repository.VehicleRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VehicleServiceImplTest {

    @Mock
    private VehicleRepository vehicleRepository;

    @InjectMocks
    private VehicleServiceImpl vehicleService;

    @Test
    void shouldAddVehicleSuccessfully() {

        VehicleRequest request = VehicleRequest.builder()
                .make("Toyota")
                .model("Fortuner")
                .category("SUV")
                .price(new BigDecimal("4200000"))
                .quantityInStock(5)
                .build();

        Vehicle savedVehicle = Vehicle.builder()
                .id(1L)
                .make("Toyota")
                .model("Fortuner")
                .category("SUV")
                .price(new BigDecimal("4200000"))
                .quantityInStock(5)
                .build();

        when(vehicleRepository.save(any(Vehicle.class)))
                .thenReturn(savedVehicle);

        VehicleResponse response = vehicleService.addVehicle(request);

        assertNotNull(response);
        assertEquals(1L, response.getId());
        assertEquals("Toyota", response.getMake());
        assertEquals("Fortuner", response.getModel());

        verify(vehicleRepository).save(any(Vehicle.class));
    }
}