package com.ecommerce.rest.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.model.Order;
import com.ecommerce.model.User;
import com.ecommerce.services.OrderService;
import com.ecommerce.services.UserService;

@RestController
public class OrderComponentController {

	@Autowired
	private OrderService orderService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/saveOrder")
	public Order saveOrder(@RequestBody Order order,  Principal principal) {
		System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaa \n"+order.toString());
		User user = userService.getUserByUsername(principal.getName());
		order.setUser(user);
		orderService.saveOrder(order);
		//System.out.println(order.toString());
		return order;
	}
	
}
