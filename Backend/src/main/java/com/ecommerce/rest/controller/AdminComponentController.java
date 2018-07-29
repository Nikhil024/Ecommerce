package com.ecommerce.rest.controller;

import java.security.Principal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.configuration.SecurityUtility;
import com.ecommerce.model.Product;
import com.ecommerce.model.ProductCategory;
import com.ecommerce.model.Role;
import com.ecommerce.model.User;
import com.ecommerce.model.UserRole;
import com.ecommerce.repository.RoleRepository;
import com.ecommerce.services.ProductCategoryService;
import com.ecommerce.services.ProductService;
import com.ecommerce.services.UserService;

@RestController
@RequestMapping("/admin")
@PreAuthorize("ROLE_ADMIN")
public class AdminComponentController {
	private static final Logger LOG = LoggerFactory.getLogger(AdminComponentController.class);

	@Autowired
	private UserService userService;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private ProductService productService;

	@Autowired
	private ProductCategoryService productCategoryService;

	@PostMapping("/addUser")
	public ResponseEntity<String> createNewUser(@RequestBody User user, Principal principal) {

		if (principal != null) {
			return new ResponseEntity<String>("Not Logged In", HttpStatus.NO_CONTENT);
		}

		Set<UserRole> userRoles = new HashSet<>();
		Role role = roleRepository.findByName(user.getRole());

		LOG.info("User role is :: " + user.getRole());
		user.setFirstName("Nikhil Mohandas");
		user.setPassword(SecurityUtility.passwordEncoder().encode(user.getPassword()));
		userRoles.add(new UserRole(user, role));
		userService.createUser(user, userRoles);
		return new ResponseEntity<String>("SuccessFully Created", HttpStatus.OK);
	}

	@PostMapping("/addProducts")
	public ResponseEntity<String> addProducts(@RequestBody List<Product> products, Principal principal) {

		if (principal != null) {
			return new ResponseEntity<String>("Not Logged In", HttpStatus.NO_CONTENT);
		}

		productService.saveAllProducts(products);
		return new ResponseEntity<String>("Saved " + products.size() + " Products!", HttpStatus.OK);
	}

	@PostMapping("/addCategories")
	public ResponseEntity<String> addCategories(@RequestBody List<ProductCategory> categories, Principal principal) {

		if (principal != null) {
			return new ResponseEntity<String>("Not Logged In", HttpStatus.NO_CONTENT);
		}

		productCategoryService.saveAllProducts(categories);
		return new ResponseEntity<String>("Saved " + categories.size() + " Categories!", HttpStatus.OK);
	}

	@PostMapping("/enableUser")
	public ResponseEntity<String> enableUser(@RequestBody User user, Principal principal) {
		String message;
		if (principal != null) {
			return new ResponseEntity<String>("Not Logged In", HttpStatus.NO_CONTENT);
		}

		if (userService.getUserByUsername(user.getUsername()) == null) {
			return new ResponseEntity<String>("User does not Exists!", HttpStatus.NO_CONTENT);
		}

		userService.updateUser(user);
		if (user.isEnabled()) {
			message = "Enabled!";
		} else {
			message = "Disabled!";
		}
		return new ResponseEntity<String>("User " + message, HttpStatus.OK);
	}

	@PostMapping("/enableProduct")
	public ResponseEntity<String> enableProduct(@RequestBody Product product, Principal principal) {
		String message;
		if (principal != null) {
			return new ResponseEntity<String>("Not Logged In", HttpStatus.NO_CONTENT);
		}

		if (productService.getProduct(product.getCode()) == null) {
			return new ResponseEntity<String>("Product does not Exists!", HttpStatus.NO_CONTENT);
		}

		productService.updateProduct(product);
		if (product.isEnabled()) {
			message = "Enabled!";
		} else {
			message = "Disabled!";
		}
		return new ResponseEntity<String>("Product " + message, HttpStatus.OK);
	}

	@PostMapping("/enableCategory")
	public ResponseEntity<String> enableCategory(@RequestBody ProductCategory category, Principal principal) {
		String message;
		System.out.println("1");
		if (principal == null) {
			System.out.println("2");
			return new ResponseEntity<String>("Not Logged In", HttpStatus.NO_CONTENT);
		}
		System.out.println("3");
		if (productCategoryService.getByType(category) == null) {
			System.out.println("4");
			return new ResponseEntity<String>("Category does not Exists!", HttpStatus.NO_CONTENT);
		}
		System.out.println("5");
		productCategoryService.updateProductCategory(category);
		System.out.println("6");
		if (category.isEnabled()) {
			message = "Enabled!";
		} else {
			message = "Disabled!";
		}
		System.out.println("7");
		return new ResponseEntity<String>("Category " + message, HttpStatus.OK);
	}
}
