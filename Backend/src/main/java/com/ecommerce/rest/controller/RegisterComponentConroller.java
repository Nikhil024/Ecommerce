package com.ecommerce.rest.controller;

import java.security.Principal;
import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.configuration.SecurityUtility;
import com.ecommerce.model.Role;
import com.ecommerce.model.User;
import com.ecommerce.model.UserRole;
import com.ecommerce.services.UserService;

@RestController
public class RegisterComponentConroller {
	private static final Logger LOG = LoggerFactory.getLogger(RegisterComponentConroller.class);

	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public User register(@RequestBody User user, Principal principal, Authentication authentication) {
		LOG.info("user:::: "+user.getUsername());
		LOG.info("Nikhil:::::: "+principal.getName());
		LOG.info("Nikhil1:::::: "+authentication.getName());
		User u = new User();
		u.setUsername(user.getUsername());
		u.setPassword(SecurityUtility.passwordEncoder().encode(user.getPassword()));
		u.setFirstName("Nikhil Mohandas");
		Set<UserRole> userRoles = new HashSet<>();
		Role role = new Role();
		role.setName("ROLE_USER");

		userRoles.add(new UserRole(u, role));
		userService.createUser(u, userRoles);

		userRoles.clear();

		
		return user;
	}
	
}
