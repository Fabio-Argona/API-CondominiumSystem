package com.condominium.payment.dto;

import com.condominium.payment.model.Payment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO implements Serializable {
    private String idResident;
    private String numberPayment;
    private String imagePayment;
    private String valuePayment;
    private String statusPayment;
    private String datePayment;
    private String registryUser;
    private String created;
    private String updated;

    public PaymentDTO(Payment entity) {
        BeanUtils.copyProperties(entity, this);
    }
}
