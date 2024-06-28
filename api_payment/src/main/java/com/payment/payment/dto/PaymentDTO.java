package com.payment.payment.dto;


import lombok.*;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO implements Serializable {

    private String dateForPayment;

    private String valuePayment;

    private String statusPayment;

    private String barcodeNumber;

    private String barcodeImage;

    private String registryUser;

    private String created;

    private String updated;



}







