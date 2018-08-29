package com.ecommerce.cronjobs;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.ecommerce.repository.CartRepository;


@Service
@EnableScheduling
public class ClearCartsCronjob {
	
	@Autowired
	private CartRepository cartRepository;
	
	@Scheduled(cron="*/10 * * * * *")
	public void clearCarts() {
		System.out.println("called::::::::::::::::::::::::::::::::");
		//cartRepository.deleteByUnusedCart(LocalDateTime.now());
	}

}
