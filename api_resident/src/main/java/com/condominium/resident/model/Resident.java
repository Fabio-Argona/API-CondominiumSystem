package com.condominium.resident.model;

import com.condominium.resident.dto.ResidentDTO;
import com.condominium.resident.dto.ResidentPaymentDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@Builder
@Document(collection = "residents")
@Getter
public class Resident implements Serializable {
    @Id
    private String id;
    private String nomeCompleto;
    private String dataNascimento;
    private List<ResidentPaymentDTO> residentPayment;
    private String genero;
    private String estadoCivil;
    @Indexed(unique = true)
    private String email;
    private String telefone;
    private String enderecoCorrespondencia;
    private String documentoIdentidade;
    private String cpf;
    private String password;
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

    public Resident(ResidentDTO dto) {
        this.nomeCompleto = dto.getNomeCompleto();
        this.dataNascimento = dto.getDataNascimento();
        this.residentPayment = dto.getResidentPayment().stream()
                .map(paymentDTO -> new ResidentPaymentDTO(
                        paymentDTO.getDateForPayment(),
                        paymentDTO.getValuePayment(),
                        paymentDTO.getStatusPayment(),
                        paymentDTO.getBarcodeNumber(),
                        paymentDTO.getBarcodeImage()))
                .toList();
        this.genero = dto.getGenero();
        this.estadoCivil = dto.getEstadoCivil();
        this.email = dto.getEmail();
        this.telefone = dto.getTelefone();
        this.enderecoCorrespondencia = dto.getEnderecoCorrespondencia();
        this.documentoIdentidade = dto.getDocumentoIdentidade();
        this.cpf = dto.getCpf();
        this.password = dto.getPassword();
        this.fotoUrl = dto.getFotoUrl();
        this.unidade = dto.getUnidade();
        this.dataInicioResidencia = dto.getDataInicioResidencia();
        this.statusResidencia = dto.getStatusResidencia();
        this.numeroMoradoresUnidade = dto.getNumeroMoradoresUnidade();
        this.placaVeiculo = dto.getPlacaVeiculo();
        this.modeloVeiculo = dto.getModeloVeiculo();
        this.corVeiculo = dto.getCorVeiculo();
        this.vagaEstacionamento = dto.getVagaEstacionamento();
        this.preferenciasContato = dto.getPreferenciasContato();
        this.observacoes = dto.getObservacoes();
        this.registryUser = dto.getRegistryUser();
        this.created = dto.getCreated();
        this.updated = dto.getUpdated();
    }

    public Resident() {
        super();
    }
}
