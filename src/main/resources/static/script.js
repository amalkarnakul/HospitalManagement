document.addEventListener('DOMContentLoaded', () => {

    const API_BASE_URL = 'http://localhost:8080/api/patients';

    const form = document.getElementById('register-form');
    const tableBody = document.getElementById('patient-table-body');
    const modal = document.getElementById('details-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const closeModalFooterBtn = document.getElementById('close-modal-footer-btn');

    /**
     * Fetches all patients from the API and populates the table.
     */
    const fetchPatients = async () => {
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) throw new Error('Network response was not ok');
            const patients = await response.json();

            tableBody.innerHTML = ''; // Clear existing rows
            if (patients.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-slate-500">No patients registered yet.</td></tr>`;
            } else {
                patients.forEach(patient => {
                    const row = `
                        <tr class="hover:bg-slate-50">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">${patient.id}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">${patient.name}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">${patient.age}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">${patient.gender}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                <button data-id="${patient.id}" class="view-details-btn text-indigo-600 hover:text-indigo-900">View Details</button>
                            </td>
                        </tr>
                    `;
                    tableBody.insertAdjacentHTML('beforeend', row);
                });
            }
        } catch (error) {
            console.error('Failed to fetch patients:', error);
            tableBody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-red-500">Error loading patients. Is the backend running?</td></tr>`;
        }
    };

    /**
     * Handles the registration form submission.
     */
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const patientData = Object.fromEntries(formData.entries());
        patientData.age = parseInt(patientData.age, 10); // Ensure age is a number

        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patientData),
            });

            if (!response.ok) throw new Error('Failed to register patient');

            form.reset(); // Clear the form
            await fetchPatients(); // Refresh the patient list
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Could not register patient. Please check the console for errors.');
        }
    };

    /**
     * Opens the modal and fetches details for a specific patient.
     */
    const openModal = async (patientId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${patientId}`);
            if (!response.ok) throw new Error('Patient not found');
            const patient = await response.json();

            modalBody.innerHTML = `
                <p><strong class="font-semibold text-slate-600 w-32 inline-block">ID:</strong> ${patient.id}</p>
                <p><strong class="font-semibold text-slate-600 w-32 inline-block">Name:</strong> ${patient.name}</p>
                <p><strong class="font-semibold text-slate-600 w-32 inline-block">Age:</strong> ${patient.age}</p>
                <p><strong class="font-semibold text-slate-600 w-32 inline-block">Gender:</strong> ${patient.gender}</p>
                <p><strong class="font-semibold text-slate-600 w-32 inline-block">Contact:</strong> ${patient.contactNumber}</p>
                <p><strong class="font-semibold text-slate-600 w-32 inline-block">Address:</strong> ${patient.address}</p>
                <p><strong class="font-semibold text-slate-600 w-32 inline-block align-top">Ailment:</strong> <span class="inline-block w-2/3">${patient.ailment}</span></p>
            `;
            modal.classList.remove('hidden');
        } catch (error) {
            console.error('Failed to fetch patient details:', error);
        }
    };

    /**
     * Closes the details modal.
     */
    const closeModal = () => {
        modal.classList.add('hidden');
    };

    // --- EVENT LISTENERS ---

    // Listen for form submission
    form.addEventListener('submit', handleFormSubmit);

    // Listen for clicks on "View Details" buttons (using event delegation)
    tableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-details-btn')) {
            const patientId = event.target.getAttribute('data-id');
            openModal(patientId);
        }
    });

    // Listen for clicks to close the modal
    closeModalBtn.addEventListener('click', closeModal);
    closeModalFooterBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        // Close if the outer backdrop is clicked, but not the modal content itself
        if (event.target === modal) {
            closeModal();
        }
    });

    // --- INITIAL LOAD ---
    fetchPatients();
});