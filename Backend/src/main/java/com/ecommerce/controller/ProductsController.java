package com.ecommerce.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ecommerce.configuration.SecurityUtility;
import com.ecommerce.model.Product;
import com.ecommerce.model.Role;
import com.ecommerce.model.User;
import com.ecommerce.model.UserRole;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;

/**
 * Handles requests for the application home page.
 */
@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class ProductsController {
	
	private static final Logger logger = LoggerFactory.getLogger(ProductsController.class);
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/")
	public @ResponseBody String demo() {
		
		User user = new User();
		
		user.setUsername("nikhil");
		user.setPassword(SecurityUtility.passwordEncoder().encode("admin"));
		user.setFirstName("Nikhil Mohandas");
		Set<UserRole> userRoles = new HashSet<>();
		Role role= new Role();
		user.setUserRoles(userRoles);
		
		userRepository.save(user);
		
		
		return "asdas";
	}
	
	@RequestMapping(value = "/getAllProduct",method = RequestMethod.GET)
	public @ResponseBody List<Product> getAllProduct(){
		return productRepository.findAll();
	}
	
	@RequestMapping(value = "/getProduct",method = RequestMethod.GET)
	public @ResponseBody List<Product> getProduct(){
		return productRepository.findAll();
	}
	
	@RequestMapping(value = "/saveAllProduct",method = RequestMethod.POST)
	public @ResponseBody List<Product> saveAllProduct(List<Product> product){
		productRepository.saveAll(product);
		return productRepository.findAll();
	}
	
	@RequestMapping(value = "/saveProduct",method = RequestMethod.POST)
	public @ResponseBody List<Product> saveProduct(Product product){
		productRepository.save(product);
		return productRepository.findAll();
	}
	
}
