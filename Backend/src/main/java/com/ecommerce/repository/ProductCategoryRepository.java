package com.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.model.ProductCategory;

@Repository
public interface ProductCategoryRepository extends CrudRepository<ProductCategory, Integer> {
	List<ProductCategory> findAll();

	/* void saveAll(List<ProductCategory> productCategory); */
	ProductCategory findByType(String type);
	@Transactional
	@Modifying
	@Query("update ProductCategory pc set pc.enabled=?1 where pc.id=?2")
	void updateCategory(boolean enabled, Integer id);
}
