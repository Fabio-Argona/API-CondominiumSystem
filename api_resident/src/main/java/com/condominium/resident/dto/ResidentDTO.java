package com.condominium.resident.dto;

import com.condominium.resident.model.Resident;

import com.condominium.resident.model.ResidentPaymentDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResidentDTO implements Serializable {

    private String id;

    //@Pattern(regexp = "^[A-Z][a-z]+\s[A-Z][a-z]+$", message = "O nome completo deve conter: " + "Nome e sobrenome com iniciais em Letra Maiúscula!")
    private String nomeCompleto;

    private String dataNascimento;

    private List<ResidentPaymentDTO> residentPayment;

    private String genero;

    private String estadoCivil;

    private String email;

    //@Pattern(regexp = "\\d{11}", message = "O telefone deve ser: " + "No formato: XXXXXXXXXXX (Apenas números)" + "Devem ser inseridos 11 números (DDD, 9 na frente e o número em si")
    private String telefone;

    private String enderecoCorrespondencia;

    private String documentoIdentidade;

    //@Pattern(regexp = "\\d{11}", message = "CPF deve conter 11 números!")
    private String cpf;

    private String passaporte;

    private String fotoUrl;

    private String unidade;

    private String dataInicioResidencia;

    private String statusResidencia;

    private int numeroMoradoresUnidade;

    private String placaVeiculo;

    private String modeloVeiculo;

    private String corVeiculo;

    private String vagaEstacionamento;

    private String preferenciasContato;

    private String observacoes;

    private String registryUser;

    private String created;

    private String updated;


    public ResidentDTO(Resident entity) {
        BeanUtils.copyProperties(entity, this);
    }

    public String getOrderItemsAsString() throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(residentPayment);
    }
}

