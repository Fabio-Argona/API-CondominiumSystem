package com.condominium.payment.model;

import com.condominium.payment.dto.PaymentDTO;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "payments")
@Getter
@Setter
public class Payment implements Serializable {
    @Id
    private String id;
    private String idResident;
    private String numberPayment;
    private String imagePayment;
    private String valuePayment;
    private String datePayment;
    private String statusPayment;
    private String registryUser;
    private String created;
    private String updated;

    public Payment(PaymentDTO paymentDTO) {
        this.idResident = paymentDTO.getIdResident();
        this.numberPayment = paymentDTO.getNumberPayment();
        this.imagePayment = paymentDTO.getImagePayment();
        this.valuePayment = paymentDTO.getValuePayment();
        this.statusPayment = paymentDTO.getStatusPayment();
        this.datePayment = paymentDTO.getDatePayment();
        this.registryUser = paymentDTO.getRegistryUser();
        this.created = paymentDTO.getCreated();
        this.updated = paymentDTO.getUpdated();
    }
}
