package com.itvedant.bloodbankmanagement.service;

import com.itvedant.bloodbankmanagement.entity.BloodStock;
import com.itvedant.bloodbankmanagement.repository.BloodStockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BloodStockServiceImpl implements BloodStockService {

    @Autowired
    private BloodStockRepository bloodStockRepository;

    @Override
    public List<BloodStock> getAllStocks() {
        return bloodStockRepository.findAll();
    }

    @Override
    public BloodStock getStockById(Long id) {
        return bloodStockRepository.findById(id).orElse(null);
    }

    @Override
    public BloodStock createStock(BloodStock stock) {
        return bloodStockRepository.save(stock);
    }

    @Override
    public BloodStock updateStock(Long id, BloodStock stockDetails) {
        BloodStock stock = bloodStockRepository.findById(id).orElse(null);
        if (stock != null) {
            stock.setBloodGroup(stockDetails.getBloodGroup());
            stock.setAvailableUnits(stockDetails.getAvailableUnits());
            return bloodStockRepository.save(stock);
        }
        return null;
    }

    @Override
    public void deleteStock(Long id) {
        bloodStockRepository.deleteById(id);
    }
}

