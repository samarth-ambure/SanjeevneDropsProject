package com.itvedant.bloodbankmanagement.service;

import com.itvedant.bloodbankmanagement.entity.BloodStock;
import java.util.List;

public interface BloodStockService {
    List<BloodStock> getAllStocks();
    BloodStock getStockById(Long id);
    BloodStock createStock(BloodStock stock);
    BloodStock updateStock(Long id, BloodStock stockDetails);
    void deleteStock(Long id);
}

