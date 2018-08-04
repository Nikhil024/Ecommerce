package com.ecommerce.services;

import java.util.List;

import com.ecommerce.model.ProductCategory;

public interface ProductCategoryService {
	List<ProductCategory> getAllProductCategories();
	List<ProductCategory> getEnabledCategories();
	void saveAllProducts(List<ProductCategory> productCategory);
	ProductCategory saveProduct(ProductCategory productCategory);
	ProductCategory getByType(ProductCategory productCategory);
	void updateProductCategory(ProductCategory productCategory);
}
