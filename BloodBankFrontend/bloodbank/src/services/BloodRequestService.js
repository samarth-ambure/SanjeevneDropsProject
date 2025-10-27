import authAxios from "./authAxios";

const API_URL = "/api/bloodrequests";

class BloodRequestService {
  getAllRequests() {
    return authAxios.get(API_URL);
  }

  getRequestById(id) {
    return authAxios.get(`${API_URL}/${id}`);
  }

  createRequest(request) {
    return authAxios.post(API_URL, request);
  }

  updateRequest(id, request) {
    return authAxios.put(`${API_URL}/${id}`, request);
  }

  deleteRequest(id) {
    return authAxios.delete(`${API_URL}/${id}`);
  }

   fulfillRequest(id) {
        return authAxios.post(`${API_URL}/${id}/fulfill`);
    }
}

const bloodRequestService = new BloodRequestService();
export default bloodRequestService;
