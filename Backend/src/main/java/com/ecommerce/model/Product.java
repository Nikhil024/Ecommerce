package com.ecommerce.model;

import java.io.Serializable;
import java.sql.Blob;
import java.time.LocalDateTime;
import java.time.ZoneId;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Data
public class Product implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@NotNull
	@Column(unique = true)
	private String code;
	private String description;
	@NotNull
	private Integer stock;
	@NotNull
	private Double price;
	private Double offerPrice;
	private boolean enabled;
	
	@OneToOne
	@NotNull
	private ProductCategory category;
	private Blob image;
	
	@Column(name = "created_date")
	@JsonIgnore
	private LocalDateTime createdOn;
	@Column(name = "lastupdate_date")
	@JsonIgnore
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
