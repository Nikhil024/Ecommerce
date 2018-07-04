package com.ecommerce.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.model.Address;
import com.ecommerce.model.User;

@Repository
public interface AddressRepository extends CrudRepository<Address, Integer> {
	List<Address> findByUser(User user);
}
