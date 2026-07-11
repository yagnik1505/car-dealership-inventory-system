package com.yagnik.cardealership.vehicle.service;

import com.yagnik.cardealership.vehicle.dto.VehicleRequest;
import com.yagnik.cardealership.vehicle.dto.VehicleResponse;
import com.yagnik.cardealership.vehicle.entity.Vehicle;
import com.yagnik.cardealership.vehicle.exception.DuplicateVehicleException;
import com.yagnik.cardealership.vehicle.exception.VehicleNotFoundException;
import com.yagnik.cardealership.vehicle.repository.VehicleRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

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

    @Test
    void shouldThrowExceptionWhenVehicleAlreadyExists() {

        VehicleRequest request = VehicleRequest.builder()
                .make("Toyota")
                .model("Fortuner")
                .category("SUV")
                .price(new BigDecimal("4200000"))
                .quantityInStock(5)
                .build();

        when(vehicleRepository.existsByMakeAndModelAndCategory(
                request.getMake(),
                request.getModel(),
                request.getCategory()))
                .thenReturn(true);

        DuplicateVehicleException exception = assertThrows(
                DuplicateVehicleException.class,
                () -> vehicleService.addVehicle(request)
        );

        assertEquals(
                "Vehicle already exists",
                exception.getMessage()
        );

        verify(vehicleRepository, never())
                .save(any(Vehicle.class));
    }

    @Test
    void shouldReturnAllVehicles() {

        Vehicle vehicle1 = Vehicle.builder()
                .id(1L)
                .make("Toyota")
                .model("Fortuner")
                .category("SUV")
                .price(new BigDecimal("4200000"))
                .quantityInStock(5)
                .build();

        Vehicle vehicle2 = Vehicle.builder()
                .id(2L)
                .make("Honda")
                .model("City")
                .category("Sedan")
                .price(new BigDecimal("1500000"))
                .quantityInStock(3)
                .build();

        when(vehicleRepository.findAll())
                .thenReturn(List.of(vehicle1, vehicle2));

        List<VehicleResponse> response = vehicleService.getAllVehicles();

        assertEquals(2, response.size());

        assertEquals("Toyota", response.get(0).getMake());
        assertEquals("Honda", response.get(1).getMake());

        verify(vehicleRepository).findAll();
    }

    @Test
    void shouldReturnVehicleWhenIdExists() {

        Vehicle vehicle = Vehicle.builder()
                .id(1L)
                .make("Toyota")
                .model("Fortuner")
                .category("SUV")
                .price(new BigDecimal("4200000"))
                .quantityInStock(5)
                .build();

        when(vehicleRepository.findById(1L))
                .thenReturn(Optional.of(vehicle));

        VehicleResponse response = vehicleService.getVehicleById(1L);

        assertNotNull(response);

        assertEquals(1L, response.getId());
        assertEquals("Toyota", response.getMake());
        assertEquals("Fortuner", response.getModel());

        verify(vehicleRepository).findById(1L);
    }

    @Test
    void shouldThrowExceptionWhenVehicleIdDoesNotExist() {

        when(vehicleRepository.findById(100L))
                .thenReturn(Optional.empty());

        VehicleNotFoundException exception = assertThrows(
                VehicleNotFoundException.class,
                () -> vehicleService.getVehicleById(100L)
        );

        assertEquals(
                "Vehicle not found",
                exception.getMessage()
        );

        verify(vehicleRepository).findById(100L);
    }

    @Test
    void shouldUpdateVehicleSuccessfully() {

        VehicleRequest request = VehicleRequest.builder()
                .make("Toyota")
                .model("Fortuner Legender")
                .category("SUV")
                .price(new BigDecimal("4500000"))
                .quantityInStock(8)
                .build();

        Vehicle existingVehicle = Vehicle.builder()
                .id(1L)
                .make("Toyota")
                .model("Fortuner")
                .category("SUV")
                .price(new BigDecimal("4200000"))
                .quantityInStock(5)
                .build();

        Vehicle updatedVehicle = Vehicle.builder()
                .id(1L)
                .make("Toyota")
                .model("Fortuner Legender")
                .category("SUV")
                .price(new BigDecimal("4500000"))
                .quantityInStock(8)
                .build();

        when(vehicleRepository.findById(1L))
                .thenReturn(Optional.of(existingVehicle));

        when(vehicleRepository.save(any(Vehicle.class)))
                .thenReturn(updatedVehicle);

        VehicleResponse response =
                vehicleService.updateVehicle(1L, request);

        assertNotNull(response);

        assertEquals("Fortuner Legender", response.getModel());
        assertEquals(new BigDecimal("4500000"), response.getPrice());
        assertEquals(8, response.getQuantityInStock());

        verify(vehicleRepository).findById(1L);
        verify(vehicleRepository).save(any(Vehicle.class));
    }

    @Test
    void shouldDeleteVehicleSuccessfully() {

        Vehicle vehicle = Vehicle.builder()
                .id(1L)
                .make("Toyota")
                .model("Fortuner")
                .category("SUV")
                .price(new BigDecimal("4200000"))
                .quantityInStock(5)
                .build();

        when(vehicleRepository.findById(1L))
                .thenReturn(Optional.of(vehicle));

        doNothing().when(vehicleRepository).delete(vehicle);

        vehicleService.deleteVehicle(1L);

        verify(vehicleRepository).findById(1L);
        verify(vehicleRepository).delete(vehicle);
    }

    @Test
    void shouldReturnVehiclesByMake() {

        Vehicle vehicle1 = Vehicle.builder()
                .id(1L)
                .make("Toyota")
                .model("Fortuner")
                .category("SUV")
                .price(new BigDecimal("4200000"))
                .quantityInStock(5)
                .build();

        Vehicle vehicle2 = Vehicle.builder()
                .id(2L)
                .make("Toyota")
                .model("Innova")
                .category("MPV")
                .price(new BigDecimal("2800000"))
                .quantityInStock(3)
                .build();

        when(vehicleRepository.findByMakeIgnoreCase("Toyota"))
                .thenReturn(List.of(vehicle1, vehicle2));

        List<VehicleResponse> response =
                vehicleService.searchByMake("Toyota");

        assertEquals(2, response.size());

        assertEquals("Fortuner", response.get(0).getModel());
        assertEquals("Innova", response.get(1).getModel());

        verify(vehicleRepository).findByMakeIgnoreCase("Toyota");
    }
}