package com.casabella.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;
    private String email;
    private String nic;
    private String address;
    private String contactNo;
    private String username;
    private String password;

    private String role; 


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
    
    public User(String name, String email, String nic, String address, String contactNo, String username,
            String password, String role) {
        this.name = name;
        this.email = email;
        this.nic = nic;
        this.address = address;
        this.contactNo = contactNo;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public User(Long userId, String name, String email, String nic, String address, String contactNo, String username,
            String password, String role) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.nic = nic;
        this.address = address;
        this.contactNo = contactNo;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public User() {
    }

    
    

    



    
}
