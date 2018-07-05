package com.ecommerce.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
public class Order implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@NotNull
	@OneToMany
	@Column(name = "product_id")
	private List<Product> product;
	@OneToOne
	@NotNull
	private Address address;
	@NotNull
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	@NotNull
	private String orderStatus;

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

	@Override
	public String toString() {
		return "Order [id=" + id + ", product=" + product + ", user=" + user + ", orderStatus=" + orderStatus
				+ ", address=" + address + ", createdOn=" + createdOn + ", lastUpdatedOn=" + lastUpdatedOn + "]";
	}

}
