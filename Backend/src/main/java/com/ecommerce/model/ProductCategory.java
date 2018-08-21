package com.ecommerce.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneId;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Table(name = "product_category")
@Data
public class ProductCategory implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Column(unique = true)
	private String type;
	@Column(unique = true)
	private String code;
	
	private boolean enabled;
	
	@JsonIgnore
	@Column(name = "created_date")
	private LocalDateTime createdOn;
	@JsonIgnore
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
