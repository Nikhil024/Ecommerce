package com.ecommerce.rest.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.model.Order;
import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import com.ecommerce.services.OrderService;
import com.ecommerce.services.ProductService;
import com.ecommerce.services.UserService;

@RestController
public class OrderComponentController {

	@Autowired
	private OrderService orderService;

	@Autowired
	private UserService userService;

	@Autowired
	private ProductService productService;

	@PostMapping("/saveOrder")
	public Order saveOrder(@RequestBody Order order, Principal principal) {

		if (order.getOrderStatus().equals("success")) {
			User user = userService.getUserByUsername(principal.getName());
			order.setUser(user);
			orderService.saveOrder(order);
			for (Product orderProduct : order.getProduct()) {
				Product product = productService.getProduct(orderProduct.getCode());
				Integer stock = product.getStock();
				product.setStock(stock - 1);
				productService.saveProduct(product);
			}
		} else if (order.getOrderStatus().equals("fruad")) {

		} else if (order.getOrderStatus().equals("failure")) {

		}
		return order;
	}

}
