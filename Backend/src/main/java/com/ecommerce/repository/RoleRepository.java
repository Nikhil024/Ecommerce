package com.ecommerce.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.ecommerce.model.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {

	Role findByName(String name);
	List<Role> findAll();
	 
}
