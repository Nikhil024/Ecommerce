package com.ecommerce.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.model.Product;
import com.ecommerce.model.ProductCategory;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.services.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepository;
	
	@Override
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	@Override
	public void saveAllProducts(List<Product> products) {
		productRepository.saveAll(products);
	}

	@Override
	public Product getProduct(String productCode) {
		return productRepository.findByCode(productCode);
	}

	@Override
	public List<Product> getProductFromCategory(ProductCategory productCategoryId) {
		return productRepository.findByCategory(productCategoryId);
	}

	@Override
	public void saveProduct(Product product) {
		productRepository.save(product);		
	}

	@Override
	public void updateProduct(Product product) {
		productRepository.updateProduct(product.isEnabled(), product.getId());		
	}

	@Override
	public List<Product> getAllEnabledProducts() {
		return productRepository.findByEnabled(true);
	}
}
