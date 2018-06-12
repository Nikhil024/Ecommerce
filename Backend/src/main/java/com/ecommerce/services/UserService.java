package com.ecommerce.services;

import java.util.List;

import com.ecommerce.model.User;

public interface UserService {
	
	public List<User> getAllUsers();
	public User getUserByEmail(String email);
}
