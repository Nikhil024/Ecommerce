package com.ecommerce.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.model.ProductCategory;
import com.ecommerce.repository.ProductCategoryRepository;
import com.ecommerce.services.ProductCategoryService;

@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {

	@Autowired
	private ProductCategoryRepository productCategoryRepository;
	
	@Override
	public List<ProductCategory> getAllProductCategories() {
		return productCategoryRepository.findAll();
	}

	@Override
	public void saveAllProducts(List<ProductCategory> productCategory) {
		productCategoryRepository.saveAll(productCategory);
	}

	@Override
	public ProductCategory saveProduct(ProductCategory productCategory) {
		return productCategoryRepository.save(productCategory);
	}

}
