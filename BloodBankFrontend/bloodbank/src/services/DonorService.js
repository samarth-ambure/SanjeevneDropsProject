import authAxios from "./authAxios";

const API_URL = "http://localhost:8080/api/donors";

class DonorService {
  getAllDonors() {
    return authAxios.get(API_URL);
  }

  getDonorById(id) {
    return authAxios.get(`${API_URL}/${id}`);
  }

  createDonor(donor) {
    return authAxios.post(API_URL, donor);
  }

  updateDonor(id, donor) {
    return authAxios.put(`${API_URL}/${id}`, donor);
  }

  deleteDonor(id) {
    return authAxios.delete(`${API_URL}/${id}`);
  }
}

const donorService = new DonorService();
export default donorService;
