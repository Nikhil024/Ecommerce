package com.ecommerce.controller;

import java.util.Collections;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.services.UserService;

@RestController
public class LoginResource {

	@Autowired
	private UserService userService;
	
	@GetMapping("/token")
	public Map<String, String> token(HttpSession session, HttpServletRequest request){
		
		System.out.println(request.getRemoteHost());
		
		String remoteHost = request.getRemoteHost();
		int portNumber = request.getRemotePort();
		
		System.out.println(remoteHost+":"+portNumber);
		System.out.println(request.getRemoteAddr());
		
		return Collections.singletonMap("token", session.getId());
		
	}
	
	
	
}
