package com.ecommerce.rest.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.model.Cart;
import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import com.ecommerce.services.CartService;
import com.ecommerce.services.ProductService;
import com.ecommerce.services.UserService;

@RestController
public class CartComponentController {
	private static final Logger LOG = LoggerFactory.getLogger(CartComponentController.class);

	@Autowired
	private CartService cartService;

	@Autowired
	private UserService userService;

	@Autowired
	private ProductService productService;

	@PostMapping("/addCart")
	public Cart addCart(@RequestBody String productCode, Principal principal) {
		if (principal == null || productCode == null) {
			return null;
		}

		User user = userService.getUserByUsername(principal.getName());
		List<Product> product = Arrays.asList(productService.getProduct(productCode));
		Cart cart = new Cart(product, user);
		cart.setTotalPrice(productService.getProduct(productCode).getOfferPrice());
		cartService.saveCart(cart);
		return cart;
	}

	@PostMapping("/unknownUserAddCart")
	public Cart addUnknownCart(@RequestBody String productCode) {
		System.out.println("a::::::::::::" + productCode);
		if (productCode == null) {
			return null;
		}

		List<Product> productList = new ArrayList<>();
		System.out.println("Product:::::: " + productService.getProduct(productCode).toString());
		Product product = productService.getProduct(productCode);
		productList.add(product);
		Cart cart = new Cart(productList, null);
		cart.setTotalPrice(product.getOfferPrice());
		cartService.saveCart(cart);
		return cart;
	}

	@PostMapping("/addExistingCart")
	public Cart addExistingCart(@RequestBody String productCodeAndCartId, Principal principal) {
		if (productCodeAndCartId == null) {
			return null;
		}
		String[] data = productCodeAndCartId.split(":");
		String productCode = data[0];
		String cartId = data[1];
		Cart cart = null;
		List<Product> product = new ArrayList<>();
		Double totalCartPrice = 0d;
		Optional<Cart> optionalCart = cartService.getCartById(Integer.parseInt(cartId));

		product.add(productService.getProduct(productCode));

		if (optionalCart.isPresent()) {
			cart = optionalCart.get();
			for (Product p : optionalCart.get().getProduct()) {
				product.add(p);
				totalCartPrice += p.getOfferPrice();
			}
		} else {
			return null;
		}
		cart.setProduct(product);
		cart.setTotalPrice(totalCartPrice);
		cartService.saveCart(cart);
		return cart;
	}
	
	@PostMapping("/removeProduct")
	public Cart removeProductFromCart(@RequestBody String productCodeAndCartId) {
		String[] productCodeAndCartIdSplit = productCodeAndCartId.split(":");
		String productCode = productCodeAndCartIdSplit[0];
		int cartId = Integer.valueOf(productCodeAndCartIdSplit[1]);
		List<Product> productList = new ArrayList<>();
		Optional<Cart> optionalCart = cartService.getCartById(cartId);
		if(optionalCart.isPresent()) {
			Cart cart = optionalCart.get();
			int count = 0;
			for(Product product : cart.getProduct()) {
				count += 1;
				if(productCode.equals(product.getCode())) {
						LOG.info("Removed the ProductCode :::::: "+product.getCode());
				}else {
					productList.add(product);
				}
			}
			cart.setProduct(productList);
			cartService.saveCart(cart);
			return cart;
		}
		return null;
	}

	@PostMapping("/getCart")
	public Cart getCart(@RequestBody String cartId) {
		if (cartId != null) {
			Optional<Cart> cart = cartService.getCartById(Integer.parseInt(cartId));
			if (cart.isPresent()) {
				return cart.get();
			}
			return null;
		}
		return null;
	}
}
