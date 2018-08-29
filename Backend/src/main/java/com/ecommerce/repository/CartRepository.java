package com.ecommerce.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.model.Cart;
import com.ecommerce.model.Product;

@Repository
public interface CartRepository extends CrudRepository<Cart, Integer> {
	Optional<Cart> findById(Integer id);
	
	@Transactional
	Long deleteByProduct(Product product);

	@Modifying
	@Transactional
	@Query(value="delete from Cart c where CREATED_DATE >= TO_TIMESTAMP(?1)")
	void deleteByUnusedCart(LocalDateTime time);
}
