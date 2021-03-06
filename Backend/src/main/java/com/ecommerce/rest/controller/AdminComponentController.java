package com.ecommerce.rest.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.Principal;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

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
@PropertySource("classpath:properties/application-${spring.profiles.active}.properties")
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
	
	
	@Value("${frontend.url}")
	private String frontendUrl;

	@PostMapping("/addUser")
	public ResponseEntity<String> createNewUser(@RequestBody User user, Principal principal) {

		if (principal == null) {
			return new ResponseEntity<String>("Not Logged In", HttpStatus.NO_CONTENT);
		}

		Set<UserRole> userRoles = new HashSet<>();
		Role role = roleRepository.findByName(user.getRole());

		LOG.info("User role is :: " + user.getRole());
		user.setFirstName("Anonymous");
		user.setPassword(SecurityUtility.passwordEncoder().encode(user.getPassword()));
		userRoles.add(new UserRole(user, role));
		userService.createUser(user, userRoles);
		return new ResponseEntity<String>("SuccessFully Created", HttpStatus.OK);
	}

	@PostMapping("/addProducts")
	public ResponseEntity<String> addProducts(@RequestBody Product products, Principal principal) {

		if (principal == null) {
			return new ResponseEntity<String>("Not Logged In", HttpStatus.NO_CONTENT);
		}

		productService.saveProduct(products);
		return new ResponseEntity<String>("Saved Products!", HttpStatus.OK);
	}

	@PostMapping("/addCategories")
	public ResponseEntity<String> addCategories(@RequestBody ProductCategory categories, Principal principal) {

		if (principal == null) {
			return new ResponseEntity<String>("Not Logged In", HttpStatus.NO_CONTENT);
		}

		productCategoryService.saveProduct(categories);
		return new ResponseEntity<String>("Saved Categories!", HttpStatus.OK);
	}

	@PostMapping("/enableUser")
	public ResponseEntity<String> enableUser(@RequestBody User user, Principal principal) {
		String message;
		if (principal == null) {
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
		if (principal == null) {
			return new ResponseEntity<String>("Not Logged In", HttpStatus.NO_CONTENT);
		}

		if (productService.getProduct(product.getCode()) == null) {
			return new ResponseEntity<String>("Product does not Exists!", HttpStatus.NO_CONTENT);
		}
		try {
		productService.updateProduct(product);
		}catch(Exception e) {
			e.printStackTrace();
		}
		ProductCategory productCategory  = productCategoryService.getByType(product.getCategory());

		if (!productCategory.isEnabled()) {
			try {
			productCategoryService.updateProductCategory(product.getCategory());
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
		
		
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
		if (principal == null) {
			return new ResponseEntity<String>("Not Logged In", HttpStatus.NO_CONTENT);
		}
		if (productCategoryService.getByType(category) == null) {
			return new ResponseEntity<String>("Category does not Exists!", HttpStatus.NO_CONTENT);
		}
		productCategoryService.updateProductCategory(category);
		
		
		List<Product> products = productService.getProductFromCategory(category);
		
		for(Product product : products) {
			product.setEnabled(category.isEnabled());
			try {
			productService.updateProduct(product);
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
		
		if (category.isEnabled()) {
			message = "Enabled!";
		} else {
			message = "Disabled!";
		}
		return new ResponseEntity<String>("Category " + message, HttpStatus.OK);
	}
	
	
	@GetMapping("/getAllRoles")
	public List<Role> getAllRoles(Principal principal) {
		return roleRepository.findAll();
	}
	
	
	@PostMapping(value = "/upload")
    public void UploadFile(MultipartHttpServletRequest request) throws IOException {

      Iterator<String> itr = request.getFileNames();
      MultipartFile file = request.getFile(itr.next());
      String fileName = file.getOriginalFilename();
      File dir = new File(frontendUrl+"/assets/images/productImages");
      if (dir.isDirectory()) {
        File serverFile = new File(dir, fileName);
        BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
        stream.write(file.getBytes());
        stream.close();
      }
    }
	
	
	
}
