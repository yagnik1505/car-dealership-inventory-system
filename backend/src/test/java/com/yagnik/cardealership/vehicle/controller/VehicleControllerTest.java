package com.yagnik.cardealership.vehicle.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yagnik.cardealership.auth.security.SecurityConfig;
import com.yagnik.cardealership.vehicle.dto.VehicleRequest;
import com.yagnik.cardealership.vehicle.dto.VehicleResponse;
import com.yagnik.cardealership.vehicle.service.VehicleService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.mockito.ArgumentMatchers.eq;
import java.math.BigDecimal;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import java.util.List;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;

@WebMvcTest(VehicleController.class)
@Import(SecurityConfig.class)
class VehicleControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    VehicleService vehicleService;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    @WithMockUser
    void shouldRejectBlankMake() throws Exception {

        VehicleRequest request = VehicleRequest.builder()
                .make("")
                .model("Fortuner")
                .category("SUV")
                .price(new BigDecimal("4200000"))
                .quantityInStock(5)
                .build();

        mockMvc.perform(post("/api/vehicles")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser
    void shouldCreateVehicleSuccessfully() throws Exception {

        VehicleRequest request = VehicleRequest.builder()
                .make("Toyota")
                .model("Fortuner")
                .category("SUV")
                .price(new BigDecimal("4200000"))
                .quantityInStock(5)
                .build();

        VehicleResponse response = VehicleResponse.builder()
                .id(1L)
                .make("Toyota")
                .model("Fortuner")
                .category("SUV")
                .price(new BigDecimal("4200000"))
                .quantityInStock(5)
                .build();

        when(vehicleService.addVehicle(any(VehicleRequest.class)))
                .thenReturn(response);

        mockMvc.perform(post("/api/vehicles")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.make").value("Toyota"))
                .andExpect(jsonPath("$.model").value("Fortuner"))
                .andExpect(jsonPath("$.category").value("SUV"))
                .andExpect(jsonPath("$.price").value(4200000))
                .andExpect(jsonPath("$.quantityInStock").value(5));
    }

    @Test
    @WithMockUser
    void shouldReturnAllVehicles() throws Exception {

        List<VehicleResponse> vehicles = List.of(
                VehicleResponse.builder()
                        .id(1L)
                        .make("Toyota")
                        .model("Fortuner")
                        .category("SUV")
                        .price(new BigDecimal("4200000"))
                        .quantityInStock(5)
                        .build(),
                VehicleResponse.builder()
                        .id(2L)
                        .make("Honda")
                        .model("City")
                        .category("Sedan")
                        .price(new BigDecimal("1500000"))
                        .quantityInStock(10)
                        .build()
        );

        when(vehicleService.getAllVehicles()).thenReturn(vehicles);

        mockMvc.perform(get("/api/vehicles"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].make").value("Toyota"))
                .andExpect(jsonPath("$[1].make").value("Honda"));
    }

    @Test
    @WithMockUser
    void shouldReturnVehicleById() throws Exception {

        VehicleResponse response = VehicleResponse.builder()
                .id(1L)
                .make("Toyota")
                .model("Fortuner")
                .category("SUV")
                .price(new BigDecimal("4200000"))
                .quantityInStock(5)
                .build();

        when(vehicleService.getVehicleById(1L))
                .thenReturn(response);

        mockMvc.perform(get("/api/vehicles/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.make").value("Toyota"))
                .andExpect(jsonPath("$.model").value("Fortuner"))
                .andExpect(jsonPath("$.category").value("SUV"))
                .andExpect(jsonPath("$.price").value(4200000))
                .andExpect(jsonPath("$.quantityInStock").value(5));
    }

    @Test
    @WithMockUser
    void shouldUpdateVehicleSuccessfully() throws Exception {

        VehicleRequest request = VehicleRequest.builder()
                .make("Toyota")
                .model("Fortuner Legender")
                .category("SUV")
                .price(new BigDecimal("4500000"))
                .quantityInStock(8)
                .build();

        VehicleResponse response = VehicleResponse.builder()
                .id(1L)
                .make("Toyota")
                .model("Fortuner Legender")
                .category("SUV")
                .price(new BigDecimal("4500000"))
                .quantityInStock(8)
                .build();

        when(vehicleService.updateVehicle(eq(1L), any(VehicleRequest.class)))
                .thenReturn(response);

        mockMvc.perform(put("/api/vehicles/1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.make").value("Toyota"))
                .andExpect(jsonPath("$.model").value("Fortuner Legender"))
                .andExpect(jsonPath("$.category").value("SUV"))
                .andExpect(jsonPath("$.price").value(4500000))
                .andExpect(jsonPath("$.quantityInStock").value(8));
    }

    @Test
    @WithMockUser
    void shouldDeleteVehicleSuccessfully() throws Exception {

        doNothing().when(vehicleService).deleteVehicle(1L);

        mockMvc.perform(delete("/api/vehicles/1")
                        .with(csrf()))
                .andExpect(status().isNoContent());
    }

    @Test
    @WithMockUser
    void shouldSearchVehicleByMake() throws Exception {

        List<VehicleResponse> vehicles = List.of(
                VehicleResponse.builder()
                        .id(1L)
                        .make("Toyota")
                        .model("Fortuner")
                        .category("SUV")
                        .price(new BigDecimal("4200000"))
                        .quantityInStock(5)
                        .build()
        );

        when(vehicleService.searchByMake("Toyota"))
                .thenReturn(vehicles);

        mockMvc.perform(get("/api/vehicles/search")
                        .param("make", "Toyota"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].make").value("Toyota"));
    }
}


