import authAxios from "./authAxios";

const API_URL = "/api/bloodstock";

class BloodStockService {
  getAllStocks() {
    return authAxios.get(API_URL);
  }

  getStockById(id) {
    return authAxios.get(`${API_URL}/${id}`);
  }

  createStock(stock) {
    return authAxios.post(API_URL, stock);
  }

  updateStock(id, stock) {
    return authAxios.put(`${API_URL}/${id}`, stock);
  }

  deleteStock(id) {
    return authAxios.delete(`${API_URL}/${id}`);
  }
}

const bloodStockService = new BloodStockService();
export default bloodStockService;
