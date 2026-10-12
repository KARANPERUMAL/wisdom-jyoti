package com.wisdomjyoti.backend.controller;

import com.wisdomjyoti.backend.dto.ApiResponse;
import com.wisdomjyoti.backend.dto.EnquiryRequest;
import com.wisdomjyoti.backend.entity.Enquiry;
import com.wisdomjyoti.backend.service.EnquiryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class EnquiryController {

    private final EnquiryService enquiryService;

    public EnquiryController(EnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    /**
     * Health check endpoint for Render monitoring and uptime checks
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "Wisdom Jyoti Admissions API",
                "timestamp", System.currentTimeMillis()
        ));
    }

    /**
     * Main endpoint called by the website's admission enquiry form
     */
    @PostMapping("/enquiries")
    public ResponseEntity<ApiResponse<Enquiry>> submitEnquiry(@Valid @RequestBody EnquiryRequest request) {
        Enquiry saved = enquiryService.createEnquiry(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Admission enquiry submitted successfully", saved));
    }

    /**
     * View all enquiries (order by latest first)
     */
    @GetMapping("/enquiries")
    public ResponseEntity<ApiResponse<List<Enquiry>>> getAllEnquiries() {
        List<Enquiry> list = enquiryService.getAllEnquiries();
        return ResponseEntity.ok(ApiResponse.success("Enquiries fetched successfully", list));
    }

    /**
     * Download the complete Excel file directly from the browser
     */
    @GetMapping("/enquiries/export")
    public ResponseEntity<byte[]> exportEnquiriesToExcel() {
        byte[] excelBytes = enquiryService.exportAllToExcel();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"wisdom-jyoti-enquiries.xlsx\"")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(excelBytes);
    }
}
