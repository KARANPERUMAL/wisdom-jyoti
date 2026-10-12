package com.wisdomjyoti.backend.service;

import com.wisdomjyoti.backend.entity.Enquiry;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ExcelExportService {

    private static final Logger logger = LoggerFactory.getLogger(ExcelExportService.class);
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd-MMM-yyyy HH:mm");

    public byte[] generateEnquiriesExcel(List<Enquiry> enquiries) {
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Admissions Enquiries");

            // Create Header Style
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerFont.setFontHeightInPoints((short) 11);
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerStyle.setAlignment(HorizontalAlignment.CENTER);
            headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);
            headerStyle.setBorderBottom(BorderStyle.THIN);
            headerStyle.setBorderTop(BorderStyle.THIN);
            headerStyle.setBorderLeft(BorderStyle.THIN);
            headerStyle.setBorderRight(BorderStyle.THIN);

            // Create Data Row Style
            CellStyle dataStyle = workbook.createCellStyle();
            dataStyle.setBorderBottom(BorderStyle.THIN);
            dataStyle.setBorderTop(BorderStyle.THIN);
            dataStyle.setBorderLeft(BorderStyle.THIN);
            dataStyle.setBorderRight(BorderStyle.THIN);
            dataStyle.setVerticalAlignment(VerticalAlignment.CENTER);

            // Headers
            String[] columns = {
                    "Enquiry ID",
                    "Submitted Date",
                    "Parent Name",
                    "Child Name",
                    "Phone Number",
                    "Email Address",
                    "Program",
                    "Message / Questions",
                    "Status"
            };

            Row headerRow = sheet.createRow(0);
            headerRow.setHeightInPoints(26);
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
            }

            // Populate Rows
            int rowIdx = 1;
            for (Enquiry enquiry : enquiries) {
                Row row = sheet.createRow(rowIdx++);
                row.setHeightInPoints(20);

                Cell cell0 = row.createCell(0);
                cell0.setCellValue(enquiry.getId() != null ? enquiry.getId() : 0);
                cell0.setCellStyle(dataStyle);

                Cell cell1 = row.createCell(1);
                cell1.setCellValue(enquiry.getCreatedAt() != null ? enquiry.getCreatedAt().format(DATE_FORMATTER) : "N/A");
                cell1.setCellStyle(dataStyle);

                Cell cell2 = row.createCell(2);
                cell2.setCellValue(enquiry.getParentName() != null ? enquiry.getParentName() : "");
                cell2.setCellStyle(dataStyle);

                Cell cell3 = row.createCell(3);
                cell3.setCellValue(enquiry.getChildName() != null ? enquiry.getChildName() : "");
                cell3.setCellStyle(dataStyle);

                Cell cell4 = row.createCell(4);
                cell4.setCellValue(enquiry.getPhone() != null ? enquiry.getPhone() : "");
                cell4.setCellStyle(dataStyle);

                Cell cell5 = row.createCell(5);
                cell5.setCellValue(enquiry.getEmail() != null ? enquiry.getEmail() : "");
                cell5.setCellStyle(dataStyle);

                Cell cell6 = row.createCell(6);
                cell6.setCellValue(enquiry.getProgram() != null ? enquiry.getProgram() : "");
                cell6.setCellStyle(dataStyle);

                Cell cell7 = row.createCell(7);
                cell7.setCellValue(enquiry.getMessage() != null ? enquiry.getMessage() : "");
                cell7.setCellStyle(dataStyle);

                Cell cell8 = row.createCell(8);
                cell8.setCellValue(enquiry.getStatus() != null ? enquiry.getStatus() : "NEW");
                cell8.setCellStyle(dataStyle);
            }

            // Auto-size columns
            for (int i = 0; i < columns.length; i++) {
                sheet.autoSizeColumn(i);
                // Extra breathing room
                sheet.setColumnWidth(i, Math.min(sheet.getColumnWidth(i) + 1200, 18000));
            }

            workbook.write(out);
            return out.toByteArray();
        } catch (IOException e) {
            logger.error("Failed to generate enquiries Excel sheet", e);
            throw new RuntimeException("Could not generate Excel spreadsheet", e);
        }
    }
}
