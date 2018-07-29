package com.ecommerce.rest.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.model.User;
import com.ecommerce.services.UserService;

@RestController
public class UserComponentController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/getUser")
	public User getUser (Principal principal) {
		return userService.getUserByUsername(principal.getName());
	}
	
	@PostMapping("/getAllUsers")
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}

}
