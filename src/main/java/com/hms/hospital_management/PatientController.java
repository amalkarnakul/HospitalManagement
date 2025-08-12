package com.hms.hospital_management;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity; // Import all from web.bind.annotation
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/patients") // Base URL for all endpoints in this controller
public class PatientController {

    @Autowired // Injects the PatientService instance
    private PatientService patientService;

    /**
     * API endpoint to register a new patient.
     * Accessible via a POST request to /api/patients/register
     * @param patient The patient data from the request body.
     * @return The created patient object with a 201 status code.
     */
    @PostMapping("/register")
    public ResponseEntity<Patient> registerPatient(@RequestBody Patient patient) {
        Patient savedPatient = patientService.registerPatient(patient);
        return new ResponseEntity<>(savedPatient, HttpStatus.CREATED);
    }

    /**
     * API endpoint to get a list of all patients.
     * Accessible via a GET request to /api/patients
     * @return A list of all patients with a 200 status code.
     */
    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients() {
        List<Patient> patients = patientService.getAllPatients();
        return ResponseEntity.ok(patients); // Returns 200 OK
    }

    /**
     * API endpoint to get a single patient by their ID.
     * Accessible via a GET request to /api/patients/{id}
     * @param id The ID of the patient, passed in the URL path.
     * @return The patient object if found (200 OK), or a 404 Not Found status.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id)
                .map(patient -> ResponseEntity.ok(patient)) // If patient exists, wrap in ResponseEntity with 200 OK
                .orElse(ResponseEntity.notFound().build()); // If not found, return 404 Not Found
    }
}