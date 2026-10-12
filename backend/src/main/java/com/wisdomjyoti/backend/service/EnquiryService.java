package com.wisdomjyoti.backend.service;

import com.wisdomjyoti.backend.dto.EnquiryRequest;
import com.wisdomjyoti.backend.entity.Enquiry;
import com.wisdomjyoti.backend.repository.EnquiryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EnquiryService {

    private static final Logger logger = LoggerFactory.getLogger(EnquiryService.class);

    private final EnquiryRepository enquiryRepository;
    private final ExcelExportService excelExportService;
    private final ResendEmailService resendEmailService;

    public EnquiryService(EnquiryRepository enquiryRepository,
                          ExcelExportService excelExportService,
                          ResendEmailService resendEmailService) {
        this.enquiryRepository = enquiryRepository;
        this.excelExportService = excelExportService;
        this.resendEmailService = resendEmailService;
    }

    /**
     * Process a new enquiry:
     * 1. Save enquiry into the database FIRST (so data is never lost).
     * 2. After successful DB save, generate Excel file with all historical enquiries.
     * 3. Send email with the new details and Excel sheet via Resend API.
     */
    @Transactional
    public Enquiry createEnquiry(EnquiryRequest request) {
        // Step 1: Save to database first
        Enquiry enquiry = new Enquiry(
                request.getParentName().trim(),
                request.getChildName().trim(),
                request.getPhone().trim(),
                request.getEmail() != null ? request.getEmail().trim() : "",
                request.getProgram().trim(),
                request.getMessage() != null ? request.getMessage().trim() : ""
        );

        Enquiry savedEnquiry = enquiryRepository.save(enquiry);
        logger.info("Enquiry #{} for child '{}' saved successfully to Neon PostgreSQL database.",
                savedEnquiry.getId(), savedEnquiry.getChildName());

        // Step 2 & 3: Generate Excel and trigger email (asynchronous or fault-tolerant)
        try {
            List<Enquiry> allEnquiries = enquiryRepository.findAllByOrderByCreatedAtDesc();
            byte[] excelBytes = excelExportService.generateEnquiriesExcel(allEnquiries);

            boolean emailSent = resendEmailService.sendEnquiryEmail(savedEnquiry, excelBytes);
            if (emailSent) {
                logger.info("Email notification for enquiry #{} dispatched successfully.", savedEnquiry.getId());
            } else {
                logger.warn("Email notification for enquiry #{} was not delivered, but enquiry is safely in database.",
                        savedEnquiry.getId());
            }
        } catch (Exception e) {
            // Crucial: Catch email/excel errors so the DB transaction is NOT rolled back!
            logger.error("Failed to process email/Excel for enquiry #{}, but DB record is preserved: {}",
                    savedEnquiry.getId(), e.getMessage(), e);
        }

        return savedEnquiry;
    }

    public List<Enquiry> getAllEnquiries() {
        return enquiryRepository.findAllByOrderByCreatedAtDesc();
    }

    public byte[] exportAllToExcel() {
        List<Enquiry> all = enquiryRepository.findAllByOrderByCreatedAtDesc();
        return excelExportService.generateEnquiriesExcel(all);
    }
}
