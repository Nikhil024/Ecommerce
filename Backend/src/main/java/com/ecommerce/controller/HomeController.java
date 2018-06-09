package com.ecommerce.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired
	private ProductRepository productRepository;
	
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(value = "/device",method = RequestMethod.GET)
	public @ResponseBody List<Product> getAllDevices(){
		return productRepository.findAll();
	}

	
}
