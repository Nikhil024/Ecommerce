package com.ecommerce.services;

import java.util.Optional;

import com.ecommerce.model.Cart;
import com.ecommerce.model.Product;

public interface CartService {
	void saveCart(Cart cart);
	Optional<Cart> getCartById(Integer id);
	public void removeCart(Cart cart);
	Long deleteByProduct(Product product);
}
