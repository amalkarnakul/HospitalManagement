package com.hms.hospital_management;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientService {

    @Autowired // Injects the PatientRepository instance
    private PatientRepository patientRepository;

    /**
     * Saves a patient to the database.
     * @param patient The patient object to be saved.
     * @return The saved patient object, including its generated ID.
     */
    public Patient registerPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    /**
     * Retrieves all patients from the database.
     * @return A list of all patient objects.
     */
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    /**
     * Finds a patient by their unique ID.
     * @param id The ID of the patient to find.
     * @return An Optional containing the patient if found, or an empty Optional if not.
     */
    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }
}