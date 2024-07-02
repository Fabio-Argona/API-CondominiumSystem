package com.condominium.payment.services;

import com.condominium.payment.exceptions.PaymentNotFoundException;
import com.condominium.payment.dto.PaymentDTO;
import com.condominium.payment.exceptions.ServiceException;
import com.condominium.payment.model.Payment;
import com.condominium.payment.repository.PaymentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PaymentServices {

    @Autowired
    private PaymentRepository repository;

    public List<PaymentDTO> findAll() throws PaymentNotFoundException {
        List<Payment> list = repository.findAll();
        if (list.isEmpty()) {
            throw new PaymentNotFoundException("No payments found");
        }
        return list.stream().map(PaymentDTO::new).collect(Collectors.toList());
    }

    @Transactional
    public PaymentDTO create(PaymentDTO paymentDTO) throws ServiceException {
        try {
            Payment entity = new Payment(paymentDTO);
            entity.setRegistryUser(paymentDTO.getRegistryUser());
            entity.setCreated(LocalDateTime.now().toString());
            repository.save(entity);
            return new PaymentDTO(entity);
        } catch (Exception e) {
            throw new ServiceException("Failed to create payment: " + e.getMessage());
        }
    }


    public PaymentDTO findById(String id) throws com.condominium.payment.exceptions.ServiceException {
        return repository.findById(id)
                .map(PaymentDTO::new)
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found with ID: " + id));
    }

    @Transactional
    public PaymentDTO update(String id, PaymentDTO paymentDTO) throws com.condominium.payment.exceptions.ServiceException {
        Optional<Payment> optionalPayment = repository.findById(id);
        if (optionalPayment.isPresent()) {
            Payment entity = optionalPayment.get();
            entity.setIdResident(paymentDTO.getIdResident());
            entity.setNumberPayment(paymentDTO.getNumberPayment());
            entity.setImagePayment(paymentDTO.getImagePayment());
            entity.setValuePayment(paymentDTO.getValuePayment());
            entity.setDatePayment(paymentDTO.getDatePayment());
            entity.setRegistryUser(paymentDTO.getRegistryUser());
            entity.setUpdated(LocalDateTime.now().toString());
            repository.save(entity);
            return new PaymentDTO(entity);
        } else {
            throw new PaymentNotFoundException("Payment not found with ID: " + id);
        }
    }

    public void delete(String id) throws ServiceException {
        if (!repository.existsById(id)) {
            throw new PaymentNotFoundException("Payment not found with ID: " + id);
        }
        repository.deleteById(id);
    }

    public PaymentServices(PaymentRepository repository) {
        this.repository = repository;
    }

    public List<PaymentDTO> findByIdResident(String idResident) throws ServiceException {
        List<Payment> residents = repository.findByIdResident(idResident);
        if (!residents.isEmpty()) {
            return residents.stream()
                    .map(PaymentDTO::new)
                    .collect(Collectors.toList());
        } else {
            throw new PaymentNotFoundException("Resident not found with ID: " + idResident);
        }
    }


//    public PaymentDTO findByIdResident(String id_resident) throws ServiceException {
//        Optional<Payment> optionalPayment = Optional.ofNullable(repository.findByIdResident(id_resident));
//        if (optionalPayment.isPresent()) {
//            Payment payment = optionalPayment.get();
//            return new PaymentDTO(payment);
//        } else {
//            throw new PaymentNotFoundException("Payment not found with Payment: " + id_resident);
//        }
//    }
}

