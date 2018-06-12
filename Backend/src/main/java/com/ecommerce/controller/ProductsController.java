package com.ecommerce.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ecommerce.dao.repository.ProductRepository;
import com.ecommerce.model.Product;

/**
 * Handles requests for the application home page.
 */
@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class ProductsController {
	
	private static final Logger logger = LoggerFactory.getLogger(ProductsController.class);
	
	@Autowired
	private ProductRepository productRepository;
	
	
	@GetMapping("/")
	public @ResponseBody String demo() {
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
