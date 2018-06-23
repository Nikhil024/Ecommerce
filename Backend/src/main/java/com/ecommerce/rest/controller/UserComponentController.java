package com.ecommerce.rest.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
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

}
