package com.ecommerce.services;

import java.util.List;
import java.util.Set;

import com.ecommerce.model.User;
import com.ecommerce.model.UserRole;

public interface UserService {
	
	public List<User> getAllUsers();
	public User getUserByEmail(String email);
	public User getUserByUsername(String username);
	public User createUser(User user, Set<UserRole> userRole);
	public void updateUser(User user);
}
