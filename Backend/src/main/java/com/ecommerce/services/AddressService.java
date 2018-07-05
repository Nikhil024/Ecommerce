package com.ecommerce.services;

import java.util.List;

import com.ecommerce.model.Address;
import com.ecommerce.model.User;

public interface AddressService {
	List<Address> getAddress(User user);
	void saveAddress(Address address);
}
