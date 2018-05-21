package com.ecommerce.personal;

public class Devices {

    private int id;
    private String code;
    private String description;
    private int stock;
    private String image;
    private String createdOn;
    private String lastUpdatedOn;

    public Devices(int id, String code, String description, int stock, String image, String createdOn, String lastUpdatedOn) {
        this.id = id;
        this.code = code;
        this.description = description;
        this.stock = stock;
        this.image = image;
        this.createdOn = createdOn;
        this.lastUpdatedOn = lastUpdatedOn;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(String createdOn) {
        this.createdOn = createdOn;
    }

    public String getLastUpdatedOn() {
        return lastUpdatedOn;
    }

    public void setLastUpdatedOn(String lastUpdatedOn) {
        this.lastUpdatedOn = lastUpdatedOn;
    }

    @Override
    public String toString() {
        return "Devices{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", description='" + description + '\'' +
                ", stock=" + stock +
                ", image='" + image + '\'' +
                ", createdOn='" + createdOn + '\'' +
                ", lastUpdatedOn='" + lastUpdatedOn + '\'' +
                '}';
    }
}
