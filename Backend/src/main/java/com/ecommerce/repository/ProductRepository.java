package com.ecommerce.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.model.Product;
import com.ecommerce.model.ProductCategory;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer> {
	List<Product> findAll();
	Product findByCode(String code);
	List<Product> findByCategory(ProductCategory id);
}
