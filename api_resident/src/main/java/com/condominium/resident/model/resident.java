package com.condominium.resident.model;

import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@Document(collection = "residents")
@Getter
public class resident implements Serializable {
    @Id
    private String id;
    private String nomeCompleto;
    private String dataNascimento;
    private String genero;
    private String estadoCivil;
    private String email;
    private String telefone;
    private String enderecoCorrespondencia;
    private String documentoIdentidade;
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
}
