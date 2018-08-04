package com.ecommerce.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

import lombok.Data;

@Data
public class Card {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Long cardNumber;
	private String CardType;
	private Integer cardExpiryYear;
	private Integer cardExpiryMonth;
	private String status;
}
