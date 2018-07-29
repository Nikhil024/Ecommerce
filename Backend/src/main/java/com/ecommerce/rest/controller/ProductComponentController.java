package com.ecommerce.rest.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.configuration.SecurityUtility;
import com.ecommerce.model.Product;
import com.ecommerce.model.ProductCategory;
import com.ecommerce.model.Role;
import com.ecommerce.model.User;
import com.ecommerce.model.UserRole;
import com.ecommerce.services.ProductCategoryService;
import com.ecommerce.services.ProductService;
import com.ecommerce.services.UserService;

@RestController
public class ProductComponentController {
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private ProductCategoryService productCategoryService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/getAllProducts")
	public List<Product> getallProducts() {
		return productService.getAllProducts();
	}
	
	@PostMapping("/getProduct")
	public Product getProduct(@RequestBody String productCode) {
		return productService.getProduct(productCode);
	}
	
	@PostMapping("/getProductFromCategory")
	public List<Product> getProductFromCategory(@RequestBody ProductCategory productCategoryId) {
		return productService.getProductFromCategory(productCategoryId);
	}

	@GetMapping("/getAllCategories")
	public List<ProductCategory> getAllCategories() {
		return productCategoryService.getAllProductCategories();
	}
	
	
	@GetMapping("/")
	public User addDetails() {

		User user = new User();
		user.setUsername("nikhil");
		user.setPassword(SecurityUtility.passwordEncoder().encode("p"));
		user.setFirstName("Nikhil Mohandas");
		Set<UserRole> userRoles = new HashSet<>();
		Role role = new Role();
		role.setRoleId(1);
		role.setName("ROLE_ADMIN");
		user.setRole(role.getName());
		userRoles.add(new UserRole(user, role));
		userService.createUser(user, userRoles);

		List<ProductCategory> pcAll =  new ArrayList<>();
		List<Product> pAll =  new ArrayList<>();
		
		
		
		
		ProductCategory pc = new ProductCategory();
		ProductCategory pc1 = new ProductCategory();
		ProductCategory pc2 = new ProductCategory();
		ProductCategory pc3 = new ProductCategory();
		ProductCategory pc4 = new ProductCategory();
		ProductCategory pc5 = new ProductCategory();
		ProductCategory pc6 = new ProductCategory();
		ProductCategory pc7 = new ProductCategory();
		ProductCategory pc8 = new ProductCategory();
		
		pc.setType("Computers & Laptops");
		pc1.setType("Cameras & Photos");
		pc2.setType("Hardware");
		pc3.setType("Smartphones & Tablets");
		pc4.setType("TV & Audio");
		pc5.setType("Gadgets");
		pc6.setType("Car & Electronics");
		pc7.setType("Video Games & Consoles");
		pc8.setType("Accessories");
		
		
		pc.setCode("Computers&Laptops");
		pc1.setCode("Cameras&Photos");
		pc2.setCode("Hardware");
		pc3.setCode("Smartphones&Tablets");
		pc4.setCode("TV&Audio");
		pc5.setCode("Gadgets");
		pc6.setCode("Car&Electronics");
		pc7.setCode("VideoGames&Consoles");
		pc8.setCode("Accessories");
		
		pc.setEnabled(true);
		pc1.setEnabled(true);
		pc2.setEnabled(true);
		pc3.setEnabled(true);
		pc4.setEnabled(true);
		pc5.setEnabled(true);
		pc6.setEnabled(true);
		pc7.setEnabled(true);
		pc8.setEnabled(true);
		
		pcAll.add(pc);
		pcAll.add(pc1);
		pcAll.add(pc2);
		pcAll.add(pc3);
		pcAll.add(pc4);
		pcAll.add(pc5);
		pcAll.add(pc6);
		pcAll.add(pc7);
		pcAll.add(pc8);
		
		productCategoryService.saveAllProducts(pcAll);
		
		
		
		
		

		Product p = new Product();
		Product p1 = new Product();
		Product p2 = new Product();
		Product p3 = new Product();
		Product p4 = new Product();
		Product p5 = new Product();
		Product p6 = new Product();
		Product p7 = new Product();
		Product p8 = new Product();
		Product p9 = new Product();
		Product p10 = new Product();
		Product p11 = new Product();
		Product p12 = new Product();
		Product p13 = new Product();
		Product p14 = new Product();
		Product p15 = new Product();
		Product p16 = new Product();
		Product p17 = new Product();
		Product p18 = new Product();
		Product p19 = new Product();
		Product p20 = new Product();
		Product p21 = new Product();
		Product p22 = new Product();
		Product p23 = new Product();
		Product p24 = new Product();
		
		
		p.setCategory(pc);
		p.setCode("Computer");
		p.setDescription("This is the Computer want to buy?");
		p.setImage(null);
		p.setOfferPrice(150000d);
		p.setPrice(152000d);
		p.setStock(2);
		
		p1.setCategory(pc1);
		p1.setCode("S8");
		p1.setDescription("This is the S8 want to buy?");
		p1.setImage(null);
		p1.setOfferPrice(58000d);
		p1.setPrice(52000d);
		p1.setStock(50);
		
		
		p2.setCategory(pc1);
		p2.setCode("S8+");
		p2.setDescription("This is the S8+ want to buy?");
		p2.setImage(null);
		p2.setOfferPrice(60000d);
		p2.setPrice(70000d);
		p2.setStock(50);
		 
		
		p3.setCategory(pc1);
		p3.setCode("s7");
		p3.setDescription("This is the s7 want to buy?");
		p3.setImage(null);
		p3.setOfferPrice(56000d);
		p3.setPrice(59000d);
		p3.setStock(50);
		
		
		p4.setCategory(pc2);
		p4.setCode("s7Edge");
		p4.setDescription("This is the s7Edge want to buy?");
		p4.setImage(null);
		p4.setOfferPrice(56000d);
		p4.setPrice(59000d);
		p4.setStock(50);
		
		
		p5.setCategory(pc2);
		p5.setCode("HTCDesire");
		p5.setDescription("This is the HTCDesire want to buy?");
		p5.setImage(null);
		p5.setOfferPrice(56000d);
		p5.setPrice(59000d);
		p5.setStock(50);
		 
		
		p6.setCategory(pc3);
		p6.setCode("Samsung Note7");
		p6.setDescription("This is the Samsung Note7 want to buy?");
		p6.setImage(null);
		p6.setOfferPrice(56000d);
		p6.setPrice(59000d);
		p6.setStock(50);
		
		
		p7.setCategory(pc3);
		p7.setCode("Samsung Note6");
		p7.setDescription("This is the Samsung Note6 want to buy?");
		p7.setImage(null);
		p7.setOfferPrice(56000d);
		p7.setPrice(59000d);
		p7.setStock(50);
		
		
		p8.setCategory(pc4);
		p8.setCode("Samsung Note5");
		p8.setDescription("This is the Samsung Note5 want to buy?");
		p8.setImage(null);
		p8.setOfferPrice(56000d);
		p8.setPrice(59000d);
		p8.setStock(50);
		
		
		p9.setCategory(pc4);
		p9.setCode("Samsung Note4");
		p9.setDescription("This is the Samsung Note4 want to buy?");
		p9.setImage(null);
		p9.setOfferPrice(56000d);
		p9.setPrice(59000d);
		p9.setStock(50);
		 
		
		p10.setCategory(pc5);
		p10.setCode("Samsung Note3");
		p10.setDescription("This is the Samsung Note3 want to buy?");
		p10.setImage(null);
		p10.setOfferPrice(56000d);
		p10.setPrice(59000d);
		p10.setStock(50);
		
		
		p11.setCategory(pc5);
		p11.setCode("Samsung Note2");
		p11.setDescription("This is the Samsung Note2 want to buy?");
		p11.setImage(null);
		p11.setOfferPrice(56000d);
		p11.setPrice(59000d);
		p11.setStock(50);
		
		
		p12.setCategory(pc5);
		p12.setCode("Samsung Note1");
		p12.setDescription("This is the Samsung Note1 want to buy?");
		p12.setImage(null);
		p12.setOfferPrice(56000d);
		p12.setPrice(59000d);
		p12.setStock(50);
		
		
		p13.setCategory(pc6);
		p13.setCode("Samsung Note");
		p13.setDescription("This is the Samsung Note want to buy?");
		p13.setImage(null);
		p13.setOfferPrice(56000d);
		p13.setPrice(59000d);
		p13.setStock(50);
		
		
		p14.setCategory(pc7);
		p14.setCode("Samsung s6");
		p14.setDescription("This is the Samsung s6 want to buy?");
		p14.setImage(null);
		p14.setOfferPrice(56000d);
		p14.setPrice(59000d);
		p14.setStock(50);
		
		
		p15.setCategory(pc8);
		p15.setCode("Samsung s5");
		p15.setDescription("This is the Samsung s5 want to buy?");
		p15.setImage(null);
		p15.setOfferPrice(56000d);
		p15.setPrice(59000d);
		p15.setStock(50);
		
		
		p16.setCategory(pc8);
		p16.setCode("Samsung s4");
		p16.setDescription("This is the Samsung s4 want to buy?");
		p16.setImage(null);
		p16.setOfferPrice(56000d);
		p16.setPrice(59000d);
		p16.setStock(50);
		
		
		p17.setCategory(pc7);
		p17.setCode("Samsung s3");
		p17.setDescription("This is the Samsung s3 want to buy?");
		p17.setImage(null);
		p17.setOfferPrice(56000d);
		p17.setPrice(59000d);
		p17.setStock(50);
		
		
		p18.setCategory(pc1);
		p18.setCode("Samsung s2");
		p18.setDescription("This is the Samsung s2 want to buy?");
		p18.setImage(null);
		p18.setOfferPrice(56000d);
		p18.setPrice(59000d);
		p18.setStock(50);
		
		
		p19.setCategory(pc);
		p19.setCode("Oneplus6");
		p19.setDescription("This is the Oneplus6 want to buy?");
		p19.setImage(null);
		p19.setOfferPrice(56000d);
		p19.setPrice(59000d);
		p19.setStock(50);
		
		
		p20.setCategory(pc);
		p20.setCode("Oneplus5");
		p20.setDescription("This is the Oneplus5 want to buy?");
		p20.setImage(null);
		p20.setOfferPrice(56000d);
		p20.setPrice(59000d);
		p20.setStock(50);
		
		
		p21.setCategory(pc4);
		p21.setCode("Oneplus4");
		p21.setDescription("This is the Oneplus4 want to buy?");
		p21.setImage(null);
		p21.setOfferPrice(56000d);
		p21.setPrice(59000d);
		p21.setStock(50);
		
		
		p22.setCategory(pc6);
		p22.setCode("Oneplus3");
		p22.setDescription("This is the Oneplus3 want to buy?");
		p22.setImage(null);
		p22.setOfferPrice(56000d);
		p22.setPrice(59000d);
		p22.setStock(50);
		
		
		p23.setCategory(pc7);
		p23.setCode("Oneplus2");
		p23.setDescription("This is the Oneplus2 want to buy?");
		p23.setImage(null);
		p23.setOfferPrice(56000d);
		p23.setPrice(59000d);
		p23.setStock(50);
		
		
		p24.setCategory(pc2);
		p24.setCode("Oneplus");
		p24.setDescription("This is the Oneplus want to buy?");
		p24.setImage(null);
		p24.setOfferPrice(56000d);
		p24.setPrice(59000d);
		p24.setStock(50);
		
		
		p.setEnabled(true);
		p1.setEnabled(true);
		p2.setEnabled(true);
		p3.setEnabled(true);
		p4.setEnabled(true);
		p5.setEnabled(true);
		p6.setEnabled(true);
		p7.setEnabled(true);
		p8.setEnabled(true);
		p9.setEnabled(true);
		p10.setEnabled(true);
		p11.setEnabled(true);
		p12.setEnabled(true);
		p13.setEnabled(true);
		p14.setEnabled(true);
		p15.setEnabled(true);
		p16.setEnabled(true);
		p17.setEnabled(true);
		p18.setEnabled(true);
		p19.setEnabled(true);
		p20.setEnabled(true);
		p21.setEnabled(true);
		p22.setEnabled(true);
		p23.setEnabled(true);
		p24.setEnabled(true);
		
		
		pAll.add(p);
		pAll.add(p1);
		pAll.add(p2);
		pAll.add(p3);
		pAll.add(p4);
		pAll.add(p5);
		pAll.add(p6);
		pAll.add(p7);
		pAll.add(p8);
		pAll.add(p9);
		pAll.add(p10);
		pAll.add(p11);
		pAll.add(p12);
		pAll.add(p13);
		pAll.add(p14);
		pAll.add(p15);
		pAll.add(p16);
		pAll.add(p17);
		pAll.add(p18);
		pAll.add(p19);
		pAll.add(p20);
		pAll.add(p21);
		pAll.add(p22);
		pAll.add(p23);
		pAll.add(p24);

		productService.saveAllProducts(pAll);

		return user;
	}
}
