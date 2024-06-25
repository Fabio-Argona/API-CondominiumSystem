package com.condominium.resident.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "residentPayments")
public class ResidentPaymentDTO implements Serializable {
    private String dateForPayment;
    private BigDecimal valuePayment;
    private String statusPayment;
    private String barcodeNumber;
    private String barcodeImage;
}

