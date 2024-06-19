package com.condominium.resident.services;

import com.condominium.resident.dto.ResidentDTO;
import com.condominium.resident.exceptions.ResidentNotFoundException;
import com.condominium.resident.exceptions.ServiceException;
import com.condominium.resident.model.Resident;
import com.condominium.resident.repositiry.ResidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ResidentService {
    @Autowired
    ResidentRepository repository;

    public List<ResidentDTO> findAll() throws ServiceException {
        List<Resident> list = repository.findAll();
        if (list.isEmpty()) {
            throw new ResidentNotFoundException("No Residents found");
        }
        return list.stream().map(ResidentDTO::new).toList();
    }

    @Transactional
    public ResidentDTO create(ResidentDTO residentDTO) throws ServiceException {
        Resident entity = new Resident(residentDTO);
        entity.setRegistryUser(residentDTO.getRegistryUser());
        entity.setCreated(LocalDateTime.now().toString());
        repository.save(entity);
        return new ResidentDTO(entity);
    }

    public ResidentDTO findById(String id) throws ServiceException {
        return repository.findById(id)
                .map(ResidentDTO::new)
                .orElseThrow(() -> new ResidentNotFoundException("Resident not found with ID: " + id));
    }

    @Transactional
    public ResidentDTO update(String id, ResidentDTO residentDTO) throws ServiceException {
        Optional<Resident> optionalResident = repository.findById(id);
        if (optionalResident.isPresent()) {
            Resident entity = optionalResident.get();
            entity.setNomeCompleto(residentDTO.getNomeCompleto());
            entity.setDataNascimento(residentDTO.getDataNascimento());
            entity.setGenero(residentDTO.getGenero());
            entity.setEstadoCivil(residentDTO.getEstadoCivil());
            entity.setEmail(residentDTO.getEmail());
            entity.setTelefone(residentDTO.getTelefone());
            entity.setEnderecoCorrespondencia(residentDTO.getEnderecoCorrespondencia());
            entity.setDocumentoIdentidade(residentDTO.getDocumentoIdentidade());
            entity.setCpf(residentDTO.getCpf());
            entity.setPassaporte(residentDTO.getPassaporte());
            entity.setFotoUrl(residentDTO.getFotoUrl());
            entity.setUnidade(residentDTO.getUnidade());
            entity.setDataInicioResidencia(residentDTO.getDataInicioResidencia());
            entity.setStatusResidencia(residentDTO.getStatusResidencia());
            entity.setNumeroMoradoresUnidade(residentDTO.getNumeroMoradoresUnidade());
            entity.setPlacaVeiculo(residentDTO.getPlacaVeiculo());
            entity.setModeloVeiculo(residentDTO.getModeloVeiculo());
            entity.setCorVeiculo(residentDTO.getCorVeiculo());
            entity.setVagaEstacionamento(residentDTO.getVagaEstacionamento());
            entity.setPreferenciasContato(residentDTO.getPreferenciasContato());
            entity.setObservacoes(residentDTO.getObservacoes());
            entity.setRegistryUser(residentDTO.getRegistryUser());
            entity.setUpdated(LocalDateTime.now().toString());
            repository.save(entity);
            return new ResidentDTO(entity);
        } else {
            throw new ResidentNotFoundException("Resident not found with ID: " + id);
        }
    }

    public void delete(String id) throws ServiceException {
        if (!repository.existsById(id)) {
            throw new ResidentNotFoundException("Resident not found with ID: " + id);
        }
        repository.deleteById(id);
    }








}
