package com.condominium.resident.controller;

import com.condominium.resident.dto.ResidentDTO;
import com.condominium.resident.exceptions.ResidentNotFoundException;
import com.condominium.resident.exceptions.ServiceException;
import com.condominium.resident.model.Resident;
import com.condominium.resident.services.ResidentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/residents")
public class ResidentController {
    @Autowired
    private ResidentService service;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping
    public ResponseEntity<List<ResidentDTO>> findAll() {
        try {
            List<ResidentDTO> clients = service.findAll();
            if (clients.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(clients);
        } catch (ServiceException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<ResidentDTO> create(@RequestBody @Valid ResidentDTO entity) {
        try {
            ResidentDTO createdResident = service.create(entity);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdResident);
        } catch (ServiceException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(value="/getId/{id}")
    public ResponseEntity<ResidentDTO> findById(@PathVariable String id) {
        try {
            ResidentDTO client = service.findById(id);
            return ResponseEntity.ok(client);
        } catch (ServiceException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping(value="/{id}")
    public ResponseEntity<ResidentDTO> update(@PathVariable String id, @Valid @RequestBody ResidentDTO clientDTO) {
        try {
            ResidentDTO updatedClient = service.update(id, clientDTO);
            return ResponseEntity.ok(updatedClient);
        } catch (ServiceException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable String id) {
        try {
            service.delete(id);
            String responseBody = objectMapper.writeValueAsString(Map.of("message", "Residente excluído com sucesso."));
            return ResponseEntity.ok(responseBody);
        } catch (ResidentNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (ServiceException e) {
            return ResponseEntity.badRequest().build();
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao processar a resposta JSON.");
        }
    }
}
