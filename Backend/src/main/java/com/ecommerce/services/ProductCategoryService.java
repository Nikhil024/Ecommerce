package com.ecommerce.services;

import java.util.List;

import com.ecommerce.model.ProductCategory;

public interface ProductCategoryService {
	List<ProductCategory> getAllProductCategories();
	void saveAllProducts(List<ProductCategory> productCategory);
	ProductCategory saveProduct(ProductCategory productCategory);
}
