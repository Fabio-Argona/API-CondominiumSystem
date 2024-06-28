package com.payment.payment.service;

import com.condominium.resident.exceptions.ResidentNotFoundException;
import com.condominium.resident.exceptions.ServiceException;
import com.payment.payment.dto.PaymentDTO;
import com.payment.payment.exceptions.PaymentNotFoundException;
import com.payment.payment.model.Payment;
import com.payment.payment.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public class PaymentService {

    @Autowired
    PaymentRepository repository;

        public List<PaymentDTO> findAll() throws com.condominium.payment.exceptions.ServiceException {
        List<Payment> list = repository.findAll();
        if (list.isEmpty()) {
            throw new com.condominium.payment.exceptions.PaymentNotFoundException("No payments found");
        }
        return list.stream().map(PaymentDTO::new).toList();
    }

    @Transactional
    public PaymentDTO create(PaymentDTO paymentDTO) throws com.condominium.payment.exceptions.ServiceException {
        try {
            Payment entity = new Payment(paymentDTO);
            entity.setRegistryUser(paymentDTO.getRegistryUser());
            entity.setCreated(LocalDateTime.now().toString());
            repository.save(entity);
            return new PaymentDTO(entity);
        } catch (Exception e) {
            throw new com.condominium.payment.exceptions.ServiceException("Failed to create payment: " + e.getMessage()); // Correção aqui
        }
    }
    public PaymentDTO findById(String id) throws com.condominium.payment.exceptions.ServiceException {
        return repository.findById(id)
                .map(PaymentDTO::new)
                .orElseThrow(() -> new ResidentNotFoundException("Payment not found with ID: " + id));
    }

    @Transactional
    public PaymentDTO update(String id, PaymentDTO paymentDTO) throws com.condominium.payment.exceptions.ServiceException {
        Optional<Payment> optionalRPayment = repository.findById(id);
        if (optionalPayment.isPresent()) {
            Payment entity = optionalPayment.get();
            entity.setId_resident(paymentDTO.getId_resident());
            entity.setNumberPayment(paymentDTO.getNumberPayment());
            entity.setImagePayment(paymentDTO.getImagePayment());
            entity.setImagePayment(paymentDTO.getImagePayment());
            entity.setValuePayment(paymentDTO.getValuePayment());

            entity.setRegistryUser(paymentDTO.getRegistryUser());
            entity.setUpdated(LocalDateTime.now().toString());
            repository.save(entity);
            return new PaymentDTO(entity);
        } else {
            throw new PaymentNotFoundException("Payment not found with ID: " + id);
        }
    }

    public void delete(String id) throws com.payment.exceptions.ServiceException {
        if (!repository.existsById(id)) {
            throw new PaymentNotFoundException("Payment not found with ID: " + id);
        }
        repository.deleteById(id);
    }

    public PaymentService(PaymentRepository repository) {
        this.repository = repository;
    }

    public PaymentDTO findByEmail(String email) throws ServiceException {
        Optional<Payment> optionalPayment = Optional.ofNullable(repository.findByEmail(email));
        if (optionalPayment.isPresent()) {
            Payment payment = optionalPayment.get();
            return new PaymentDTO(payment);
        } else {
            throw new ResidentNotFoundException("Payment not found with Email: " + email);
        }
    }
