package com.ecommerce.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.model.Cart;

@Repository
public interface CartRepository extends CrudRepository<Cart, Integer> {
}
