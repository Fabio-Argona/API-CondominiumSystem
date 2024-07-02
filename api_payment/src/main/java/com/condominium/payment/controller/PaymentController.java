package com.condominium.payment.controller;

import com.condominium.payment.dto.PaymentDTO;
import com.condominium.payment.exceptions.PaymentNotFoundException;
import com.condominium.payment.exceptions.ServiceException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private com.condominium.payment.services.PaymentServices service;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    public ResponseEntity<List<PaymentDTO>> findAll() throws ServiceException {
        try {
            List<PaymentDTO> payments = service.findAll();
            if (payments.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(payments);
        } catch (PaymentNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<PaymentDTO> create(@RequestBody @Valid PaymentDTO paymentDTO) {
        try {
            PaymentDTO createdPayment = service.create(paymentDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPayment);
        } catch (ServiceException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(value = "/getId/{id}")
    public ResponseEntity<PaymentDTO> findById(@PathVariable String id) {
        try {
            PaymentDTO resident = service.findById(id);
            return ResponseEntity.ok(resident);
        } catch (ServiceException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<PaymentDTO> update(@PathVariable String id, @Valid @RequestBody PaymentDTO paymentDTO) {
        try {
            PaymentDTO updatedPayment = service.update(id, paymentDTO);
            return ResponseEntity.ok(updatedPayment);
        } catch (ServiceException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable String id) throws ServiceException {
        try {
            service.delete(id);
            String responseBody = objectMapper.writeValueAsString(Map.of("message", "Pagamento excluído com sucesso."));
            return ResponseEntity.ok(responseBody);
        } catch (PaymentNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao processar a resposta JSON.");
        }
    }

    @GetMapping(value="/getIdResident/{idResident}")
    public ResponseEntity<List<PaymentDTO>> findByIdResident(@PathVariable String idResident) {
        try {
            List<PaymentDTO> payments = service.findByIdResident(idResident);
            return ResponseEntity.ok(payments);
        } catch (ServiceException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
