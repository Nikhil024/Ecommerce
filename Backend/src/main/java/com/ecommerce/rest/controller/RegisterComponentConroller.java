package com.ecommerce.rest.controller;

import java.util.HashSet;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	public ResponseEntity<String> register(@RequestBody User user, HttpServletResponse response) {
		if (userService.getUserByUsername(user.getUsername()) != null) {
			return new ResponseEntity<String>("User already Exists", HttpStatus.NOT_FOUND);
		} else {
			User u = new User();
			u.setUsername(user.getUsername());
			u.setPassword(SecurityUtility.passwordEncoder().encode(user.getPassword()));
			u.setFirstName("Anonymous");
			Set<UserRole> userRoles = new HashSet<>();
			Role role = new Role();
			role.setName("ROLE_USER");
			u.setRole(role.getName());
			userRoles.add(new UserRole(u, role));
			userService.createUser(u, userRoles);
			userRoles.clear();

			return new ResponseEntity<String>("Success!", HttpStatus.OK);
		}
	}

}
