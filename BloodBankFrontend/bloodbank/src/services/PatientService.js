import authAxios from "./authAxios";

const API_URL = "/api/patients";

class PatientService {
  getAllPatients() {
    return authAxios.get(API_URL);
  }

  getPatientById(id) {
    return authAxios.get(`${API_URL}/${id}`);
  }

  createPatient(patient) {
    return authAxios.post(API_URL, patient);
  }

  updatePatient(id, patient) {
    return authAxios.put(`${API_URL}/${id}`, patient);
  }

  deletePatient(id) {
    return authAxios.delete(`${API_URL}/${id}`);
  }
}

const patientService = new PatientService();
export default patientService;
