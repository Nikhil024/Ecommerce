package com.ecommerce.services.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.model.Cart;
import com.ecommerce.model.Product;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.services.CartService;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private CartRepository cartRepository;
	
	@Override
	public void saveCart(Cart cart) {
		cartRepository.save(cart);
	}
	
	public Cart getCart(Integer id) {
		Optional<Cart> cart =  cartRepository.findById(id);
		if(cart.isPresent()) {
			return cart.get();
		}
		return null;
		 
	}

	@Override
	public Optional<Cart> getCartById(Integer id) {
		return cartRepository.findById(id);
	}
	
	@Override	
	public void removeCart(Cart cart) {
		cartRepository.delete(cart);
	}

	@Override
	public Long deleteByProduct(Product product) {
		return cartRepository.deleteByProduct(product);
	}

}
