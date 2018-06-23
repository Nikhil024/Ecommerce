package com.ecommerce.services;

import java.util.List;

import com.ecommerce.model.Product;

public interface ProductService {
	List<Product> getAllProducts();
	void saveAllProducts(List<Product> products);
	Product getProduct(String productCode);
}
