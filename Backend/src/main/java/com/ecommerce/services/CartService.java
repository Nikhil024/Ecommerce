package com.ecommerce.services;

import java.util.Optional;

import com.ecommerce.model.Cart;

public interface CartService {
	void saveCart(Cart cart);
	Optional<Cart> getCartById(Integer id);
}
