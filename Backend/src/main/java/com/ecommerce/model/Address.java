package com.ecommerce.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneId;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.constraints.NotNull;

import com.ecommerce.enumaration.AddressType;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Address implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@NotNull
	private String firstName;
	@NotNull
	private String lastName;
	@NotNull
	private String address;
	private AddressType type;
	@NotNull
	private Integer postalCode;
	@NotNull
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
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
