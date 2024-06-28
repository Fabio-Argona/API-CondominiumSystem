package com.payment.payment.controller;

import com.payment.payment.dto.PaymentDTO;
import com.payment.payment.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public class PaymentController {

    @Autowired
    private PaymentService service;

    @GetMapping
    public ResponseEntity<List<PaymentDTO>> findAll() {
        try {
            List<PaymentDTO> clients = service.findAll();
            if (clients.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(clients);
        } catch (ServiceException e) {
            return ResponseEntity.badRequest().build();
        }
    }





}
