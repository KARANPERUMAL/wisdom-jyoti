package com.wisdomjyoti.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class EnquiryRequest {

    @NotBlank(message = "Parent name is required")
    @Size(max = 100, message = "Parent name cannot exceed 100 characters")
    private String parentName;

    @NotBlank(message = "Child name is required")
    @Size(max = 100, message = "Child name cannot exceed 100 characters")
    private String childName;

    @NotBlank(message = "Phone number is required")
    @Size(max = 25, message = "Phone number cannot exceed 25 characters")
    private String phone;

    private String email;

    @NotBlank(message = "Program of interest is required")
    private String program;

    private String message;

    public EnquiryRequest() {
    }

    public EnquiryRequest(String parentName, String childName, String phone, String email, String program, String message) {
        this.parentName = parentName;
        this.childName = childName;
        this.phone = phone;
        this.email = email;
        this.program = program;
        this.message = message;
    }

    // Getters and Setters
    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public String getChildName() {
        return childName;
    }

    public void setChildName(String childName) {
        this.childName = childName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProgram() {
        return program;
    }

    public void setProgram(String program) {
        this.program = program;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
