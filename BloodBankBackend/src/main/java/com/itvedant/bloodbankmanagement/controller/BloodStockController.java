package com.itvedant.bloodbankmanagement.controller;

import com.itvedant.bloodbankmanagement.entity.BloodStock;
import com.itvedant.bloodbankmanagement.service.BloodStockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bloodstock")
public class BloodStockController {

    @Autowired
    private BloodStockService bloodStockService;

    @GetMapping
    public List<BloodStock> getAllStocks() {
        return bloodStockService.getAllStocks();
    }

    @GetMapping("/{id}")
    public BloodStock getStockById(@PathVariable Long id) {
        return bloodStockService.getStockById(id);
    }

    @PostMapping
    public BloodStock createStock(@RequestBody BloodStock stock) {
        return bloodStockService.createStock(stock);
    }

    @PutMapping("/{id}")
    public BloodStock updateStock(@PathVariable Long id, @RequestBody BloodStock stockDetails) {
        return bloodStockService.updateStock(id, stockDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteStock(@PathVariable Long id) {
        bloodStockService.deleteStock(id);
    }
}
