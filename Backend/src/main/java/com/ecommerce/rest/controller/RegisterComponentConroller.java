package com.ecommerce.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.model.User;
import com.ecommerce.services.UserService;

@RestController
public class RegisterComponentConroller {

	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public User register() {
		
		/*userService.createUser(user, userRole);*/
		return null;
	}
	
}
