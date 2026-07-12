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

import java.math.BigDecimal;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

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

}


