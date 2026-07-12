package com.yagnik.cardealership.vehicle.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(VehicleNotFoundException.class)
    public ResponseEntity<String> handleVehicleNotFoundException(
            VehicleNotFoundException ex) {

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ex.getMessage());
    }

    @ExceptionHandler(DuplicateVehicleException.class)
    public ResponseEntity<String> handleDuplicateVehicleException(
            DuplicateVehicleException ex) {

        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ex.getMessage());
    }
}