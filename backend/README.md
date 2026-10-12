# Wisdom Jyoti - Spring Boot Backend API

Production-ready backend API for **Wisdom Jyoti Preschool & Skill Development Center**, Mahalakshmipuram.

## 🏗️ Architecture & Technology Stack
- **Framework**: Spring Boot 3.3.5 (Java 17+)
- **Database**: Neon PostgreSQL (with H2 in-memory fallback for offline development)
- **Email Service**: Resend API via HTTPS (avoids Render Free SMTP port 587 blocks)
- **Spreadsheets**: Apache POI (generates `wisdom-jyoti-enquiries.xlsx` attachment with complete history)
- **Deployment**: Render (Web Service / Docker)

---

## 🔄 Backend Flow
When a parent submits an admission enquiry from the website:
1. **Frontend** posts form data to `POST /api/enquiries`.
2. **Backend** validates the payload (parent name, child name, phone, email, program, message).
3. **Database Save First**: The enquiry is committed to the Neon PostgreSQL `enquiries` table first. (Ensures zero data loss even if mail servers are unreachable).
4. **Excel Generation**: Apache POI exports all database records into `wisdom-jyoti-enquiries.xlsx`.
5. **Resend Email API**: Backend sends a branded email to `MANAGER_EMAIL` (`karanperumaln@gmail.com`) with the enquiry details and the Excel spreadsheet attached.

---

## 🛠️ Environment Variables for Render / Production

| Variable | Description | Example / Recommended Value |
|---|---|---|
| `SPRING_DATASOURCE_URL` | Neon PostgreSQL JDBC URL | `jdbc:postgresql://ep-xxx.neon.tech/neondb?sslmode=require` |
| `SPRING_DATASOURCE_USERNAME` | Neon PostgreSQL Username | `neondb_owner` |
| `SPRING_DATASOURCE_PASSWORD` | Neon PostgreSQL Password | `<your_neon_password>` |
| `RESEND_API_KEY` | Resend API Key | `re_xxxxxxxxxxxx` |
| `RESEND_FROM` | Verified sender in Resend | `Wisdom Jyoti <onboarding@resend.dev>` or `admissions@yourdomain.com` |
| `MANAGER_EMAIL` | Admin email to receive notifications | `karanperumaln@gmail.com` |
| `MAIL_ENABLED` | Toggle email sending | `true` |
| `CORS_ALLOWED_ORIGINS` | Allowed frontend domains | `https://wisdom-jyoti.vercel.app,http://localhost:5173` |

---

## 🚀 Running Locally

### 1. Build and Run Backend
```bash
cd backend
mvn clean package -DskipTests
java -jar target/wisdom-jyoti-backend-0.0.1-SNAPSHOT.jar
```
Or run directly:
```bash
mvn spring-boot:run
```

The server starts at `http://localhost:8080`.
- Health Check: `http://localhost:8080/api/health`
- H2 Console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:wisdomjyotidb`, Username: `sa`, Password: blank)

---

## 📡 REST API Endpoints

### 1. Submit Enquiry
- **Endpoint**: `POST /api/enquiries`
- **Request Body**:
```json
{
  "parentName": "Priya Sharma",
  "childName": "Aarav Sharma",
  "phone": "+91 98765 43210",
  "email": "priya@example.com",
  "program": "Nursery",
  "message": "Interested in morning batches."
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Admission enquiry submitted successfully",
  "data": {
    "id": 1,
    "parentName": "Priya Sharma",
    "childName": "Aarav Sharma",
    "phone": "+91 98765 43210",
    "email": "priya@example.com",
    "program": "Nursery",
    "message": "Interested in morning batches.",
    "status": "NEW",
    "createdAt": "2026-10-12T10:30:00"
  }
}
```

### 2. View All Enquiries
- **Endpoint**: `GET /api/enquiries`

### 3. Direct Excel Download
- **Endpoint**: `GET /api/enquiries/export`
- Downloads `wisdom-jyoti-enquiries.xlsx` directly.

### 4. Health Check
- **Endpoint**: `GET /api/health`

---

## 🗄️ Neon PostgreSQL SQL Schema
Table is created automatically by Hibernate (`ddl-auto=update`), or can be created manually:
```sql
CREATE TABLE IF NOT EXISTS enquiries (
    id BIGSERIAL PRIMARY KEY,
    parent_name VARCHAR(100) NOT NULL,
    child_name VARCHAR(100) NOT NULL,
    phone VARCHAR(25) NOT NULL,
    email VARCHAR(255),
    program VARCHAR(100) NOT NULL,
    message TEXT,
    status VARCHAR(50) DEFAULT 'NEW',
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

SELECT * FROM enquiries ORDER BY created_at DESC;
```
