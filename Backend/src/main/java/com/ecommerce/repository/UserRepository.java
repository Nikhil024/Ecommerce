package com.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
	User findByEmail(String email);
	List<User> findAll(); 
	User findByUsername(String username);
	
	@Modifying
	@Transactional
	@Query("update User u set u.enabled = ?1 where u.id= ?2")
	void updateUser(boolean enabled, Integer id);
}
