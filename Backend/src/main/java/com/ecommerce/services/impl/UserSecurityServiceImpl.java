package com.ecommerce.services.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ecommerce.dao.repository.UserRepository;
import com.ecommerce.model.User;
import com.ecommerce.services.UserSecurityService;

@Service
public class UserSecurityServiceImpl implements UserSecurityService, UserDetailsService{
	private static final Logger LOG = LoggerFactory.getLogger(UserSecurityServiceImpl.class);
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User user = userRepository.findByUsername(username);
		if(user == null) {
			LOG.warn("Username {} not found",username);
			throw new UsernameNotFoundException("Username "+username+" not found");
		}
		return user;
	}


}


	