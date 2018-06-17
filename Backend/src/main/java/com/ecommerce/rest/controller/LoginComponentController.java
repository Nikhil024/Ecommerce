package com.ecommerce.rest.controller;

import java.security.Principal;
import java.util.Collections;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200", exposedHeaders="Access-Control-Allow-Origin")
public class LoginComponentController {
	private static final Logger LOG = LoggerFactory.getLogger(LoginComponentController.class);

	@Autowired
	private UserService userService;
	
	@GetMapping("/token")
	public Map<String, String> token(HttpSession session, HttpServletRequest request,Principal principal, Authentication authentication){
		
		System.out.println("Nikhil:::::: "+principal.getName());
		System.out.println("Nikhil1:::::: "+authentication.getName());
		
		System.out.println(request.getRemoteHost());
		
		String remoteHost = request.getRemoteHost();
		int portNumber = request.getRemotePort();
		
		System.out.println(remoteHost+":"+portNumber);
		System.out.println(request.getRemoteAddr());
		
		return Collections.singletonMap("token", session.getId());
		
	}
	
	@GetMapping("/checkSession")
	public ResponseEntity<String> checkSession(Principal principal, Authentication authentication) {
		System.out.println("Nikhil1111111:::::: "+principal.getName());
		System.out.println("Nikhil122222222:::::: "+authentication.getName());
		return new ResponseEntity<String>("Session Active!",HttpStatus.OK);
	}
	
	@PostMapping("/userLogout")
	public ResponseEntity<String> logout(HttpServletResponse response) {
		SecurityContextHolder.clearContext();
		response.setStatus(HttpServletResponse.SC_OK);
		return new ResponseEntity<String>("Logout Success!",HttpStatus.OK);
	}
	
}