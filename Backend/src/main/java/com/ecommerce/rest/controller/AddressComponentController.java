package com.ecommerce.rest.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.model.Address;
import com.ecommerce.model.User;
import com.ecommerce.services.AddressService;
import com.ecommerce.services.UserService;

@RestController
public class AddressComponentController {

	@Autowired
	private AddressService addressService;
	
	@Autowired
	private UserService userService;
	
	
	@GetMapping("/getAddress")
	public List<Address> getAddress(Principal principal) {
		User user = userService.getUserByUsername(principal.getName());
		return addressService.getAddress(user);
	}
	
	
}
