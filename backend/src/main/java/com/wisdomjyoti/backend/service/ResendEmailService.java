package com.wisdomjyoti.backend.service;

import com.wisdomjyoti.backend.entity.Enquiry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.format.DateTimeFormatter;
import java.util.Base64;

@Service
public class ResendEmailService {

    private static final Logger logger = LoggerFactory.getLogger(ResendEmailService.class);
    private static final String RESEND_API_URL = "https://api.resend.com/emails";
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");

    private final HttpClient httpClient;

    @Value("${resend.api.key:}")
    private String resendApiKey;

    @Value("${resend.from:Wisdom Jyoti <onboarding@resend.dev>}")
    private String resendFrom;

    @Value("${resend.manager.email:karanperumaln@gmail.com}")
    private String managerEmail;

    @Value("${resend.mail.enabled:true}")
    private boolean mailEnabled;

    @Value("${resend.excel.filename:wisdom-jyoti-enquiries.xlsx}")
    private String excelFilename;

    public ResendEmailService() {
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(15))
                .build();
    }

    public boolean sendEnquiryEmail(Enquiry newEnquiry, byte[] excelAttachmentBytes) {
        if (!mailEnabled) {
            logger.info("Email notification is disabled via MAIL_ENABLED=false. Skipping email send.");
            return false;
        }

        if (resendApiKey == null || resendApiKey.trim().isEmpty() || resendApiKey.equals("your_resend_key")) {
            logger.warn("RESEND_API_KEY is not configured. Enquiry saved in DB, but email was skipped.");
            return false;
        }

        try {
            String subject = "New Admission Enquiry: " + newEnquiry.getChildName() + " (" + newEnquiry.getProgram() + ")";
            String htmlContent = buildHtmlContent(newEnquiry);
            String base64Excel = Base64.getEncoder().encodeToString(excelAttachmentBytes);

            // Construct JSON Payload for Resend API
            String jsonPayload = buildJsonPayload(resendFrom, managerEmail, subject, htmlContent, excelFilename, base64Excel);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(RESEND_API_URL))
                    .timeout(Duration.ofSeconds(20))
                    .header("Authorization", "Bearer " + resendApiKey.trim())
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                logger.info("Successfully sent enquiry email via Resend to {}. Response: {}", managerEmail, response.body());
                return true;
            } else {
                logger.error("Resend API returned error status {}: {}", response.statusCode(), response.body());
                return false;
            }
        } catch (Exception e) {
            logger.error("Error occurred while sending email via Resend API: {}", e.getMessage(), e);
            return false;
        }
    }

    private String buildJsonPayload(String from, String to, String subject, String html, String filename, String base64Content) {
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        sb.append("\"from\":").append(escapeJson(from)).append(",");
        sb.append("\"to\":[").append(escapeJson(to)).append("],");
        sb.append("\"subject\":").append(escapeJson(subject)).append(",");
        sb.append("\"html\":").append(escapeJson(html)).append(",");
        sb.append("\"attachments\":[");
        sb.append("{");
        sb.append("\"filename\":").append(escapeJson(filename)).append(",");
        sb.append("\"content\":").append(escapeJson(base64Content));
        sb.append("}");
        sb.append("]");
        sb.append("}");
        return sb.toString();
    }

    private String escapeJson(String raw) {
        if (raw == null) return "\"\"";
        StringBuilder sb = new StringBuilder("\"");
        for (char c : raw.toCharArray()) {
            switch (c) {
                case '"': sb.append("\\\""); break;
                case '\\': sb.append("\\\\"); break;
                case '\b': sb.append("\\b"); break;
                case '\f': sb.append("\\f"); break;
                case '\n': sb.append("\\n"); break;
                case '\r': sb.append("\\r"); break;
                case '\t': sb.append("\\t"); break;
                default:
                    if (c < ' ') {
                        sb.append(String.format("\\u%04x", (int) c));
                    } else {
                        sb.append(c);
                    }
            }
        }
        sb.append("\"");
        return sb.toString();
    }

    private String buildHtmlContent(Enquiry enquiry) {
        String formattedDate = enquiry.getCreatedAt() != null ? enquiry.getCreatedAt().format(DATE_FORMATTER) : "Just now";
        String messageText = enquiry.getMessage() != null && !enquiry.getMessage().trim().isEmpty() ? enquiry.getMessage() : "None provided";
        String emailText = enquiry.getEmail() != null && !enquiry.getEmail().trim().isEmpty() ? enquiry.getEmail() : "None provided";

        return "<div style=\"font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;\">" +
                "<div style=\"background-color: #06182f; color: #ffffff; padding: 24px; text-align: center;\">" +
                "<h1 style=\"margin: 0; font-size: 22px; color: #ffe343;\">Wisdom Jyoti Preschool</h1>" +
                "<p style=\"margin: 6px 0 0 0; font-size: 13px; color: #cbd5e1;\">Mahalakshmipuram, Bengaluru &bull; Skill Development Center</p>" +
                "</div>" +
                "<div style=\"padding: 24px;\">" +
                "<div style=\"background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 12px 16px; margin-bottom: 20px; border-radius: 4px;\">" +
                "<strong style=\"color: #065f46; font-size: 15px;\">New Admission Enquiry Received (#" + enquiry.getId() + ")</strong>" +
                "<p style=\"margin: 4px 0 0 0; font-size: 12px; color: #047857;\">Submitted on " + formattedDate + "</p>" +
                "</div>" +
                "<table style=\"width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;\">" +
                "<tr>" +
                "<td style=\"padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 38%;\">Child's Name:</td>" +
                "<td style=\"padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 800;\">" + enquiry.getChildName() + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td style=\"padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;\">Parent's Name:</td>" +
                "<td style=\"padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;\">" + enquiry.getParentName() + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td style=\"padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;\">Phone Number:</td>" +
                "<td style=\"padding: 10px 0; border-bottom: 1px solid #f1f5f9;\"><a href=\"tel:" + enquiry.getPhone() + "\" style=\"color: #ef1118; font-weight: bold; text-decoration: none;\">" + enquiry.getPhone() + "</a></td>" +
                "</tr>" +
                "<tr>" +
                "<td style=\"padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;\">Email Address:</td>" +
                "<td style=\"padding: 10px 0; border-bottom: 1px solid #f1f5f9;\">" + emailText + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td style=\"padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;\">Program of Interest:</td>" +
                "<td style=\"padding: 10px 0; border-bottom: 1px solid #f1f5f9;\"><span style=\"background-color: #ffe343; color: #06182f; font-weight: bold; padding: 3px 8px; border-radius: 4px;\">" + enquiry.getProgram() + "</span></td>" +
                "</tr>" +
                "<tr>" +
                "<td style=\"padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;\">Parent's Message:</td>" +
                "<td style=\"padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-style: italic; color: #475569;\">\"" + messageText + "\"</td>" +
                "</tr>" +
                "</table>" +
                "<div style=\"margin-top: 24px; padding: 14px; background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; text-align: center; font-size: 13px; color: #475569;\">" +
                "&#128206; <strong>Attached Excel File:</strong> <code>" + excelFilename + "</code><br/>" +
                "<span style=\"font-size: 12px; color: #64748b;\">Contains the complete historical list of all enquiries stored in your database.</span>" +
                "</div>" +
                "</div>" +
                "<div style=\"background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #64748b;\">" +
                "Wisdom Jyoti Admissions Notification &bull; 274, 2nd Main Rd, Mahalakshmipuram, Bengaluru 560086" +
                "</div>" +
                "</div>";
    }
}
