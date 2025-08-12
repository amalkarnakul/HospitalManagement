package com.hms.hospital_management;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    // JpaRepository<Entity, PrimaryKeyType>
    // All basic CRUD methods (save, findById, findAll, delete) are inherited
    // and ready to use. You can add custom query methods here if needed.
}