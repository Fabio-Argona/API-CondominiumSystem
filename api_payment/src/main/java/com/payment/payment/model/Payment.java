package com.payment.payment.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@AllArgsConstructor
@Builder
@Document(collection = "payments")
@Getter
public class Payment implements Serializable {
    @Id
    private String id;
    private String id_resident;
    private String numberPayment;
    private String imagePayment;
    private String valuePayment;

    private String registryUser;
    private String created;
    private String updated;


}