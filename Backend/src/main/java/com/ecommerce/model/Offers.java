package com.ecommerce.model;

import java.time.LocalDateTime;
import java.time.ZoneId;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(includeFieldNames = true)
@Entity
public class Offers {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String type;
	private Double price;
	
	@Column(name = "created_date")
	private LocalDateTime createdOn;
	@Column(name = "lastupdate_date")
	private LocalDateTime lastUpdatedOn;

	@PrePersist
	public void setCreatedOn() {
		this.createdOn = LocalDateTime.now(ZoneId.of("Asia/Calcutta"));
	}

	@PreUpdate
	public void setLastUpdatedOn() {
		this.lastUpdatedOn = LocalDateTime.now(ZoneId.of("Asia/Calcutta"));
	}
}
