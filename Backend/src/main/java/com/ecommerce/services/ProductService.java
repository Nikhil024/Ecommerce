package com.ecommerce.services;

import java.util.List;

import com.ecommerce.model.Product;
import com.ecommerce.model.ProductCategory;

public interface ProductService {
	List<Product> getAllProducts();
	void saveAllProducts(List<Product> products);
	Product getProduct(String productCode);
	List<Product> getProductFromCategory(ProductCategory productCategoryId);
	List<Product> getAllEnabledProducts();
	void saveProduct(Product product);
	void updateProduct(Product product);
}
