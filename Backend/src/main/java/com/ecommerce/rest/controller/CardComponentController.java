package com.ecommerce.rest.controller;

import java.security.Principal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.configuration.SecurityUtility;
import com.ecommerce.model.Card;

@RestController
public class CardComponentController {
	private static final Logger LOG = LoggerFactory.getLogger(CardComponentController.class);
	private static final String SUCCESS_CARD = "1111111111111111";
	private static final String FRAUD_CARD = "111111111111112";
	private static final String FAILURE_CARD = "1111111111111113";
	private static final String SUCCESS_CODE = "success";
	private static final String FRAUD_CODE = "fraud";
	private static final String FAILURE_CODE = "failure";
	
	@PostMapping("/validateCard")
	public Card validateCard(@RequestBody Card card, Principal principal) {
		System.out.println("Card details::: "+card.toString());
		if(card.getCardNumber().toString().equals(SUCCESS_CARD)) {
			System.out.println("inside 1");
			card.setStatus(SUCCESS_CODE);
			System.out.println("Card details1::: "+card.toString());
			return card;
		} else if(card.getCardNumber().toString().equals(FRAUD_CARD)) {
			System.out.println("inside 2");
			card.setStatus(FRAUD_CODE);
			return card;
		}else if(card.getCardNumber().toString().equals(FAILURE_CARD)) {
			System.out.println("inside 3");
			card.setStatus(FAILURE_CODE);
			return card;
		}
		System.out.println("inside 4");
		card.setStatus(FAILURE_CODE);
		return card;
	}

}
