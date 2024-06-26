package com.condominium.resident.repositiry;

import com.condominium.resident.model.Resident;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResidentRepository extends MongoRepository<Resident, String> {
    Resident findByEmail(String email);
}
