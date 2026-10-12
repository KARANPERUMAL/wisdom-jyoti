# Wisdom Jyoti - Preschool & Skill Development Center

A full-stack web application for Wisdom Jyoti Preschool, featuring an interactive frontend and a Spring Boot backend API with PostgreSQL storage, Resend transactional emails, and automated Excel export.

---

## Architecture Overview

```
wisdom-jyoti/
├── frontend/               # React + Vite Frontend
│   ├── src/
│   │   ├── assets/         # Images, videos, stickers
│   │   ├── components/     # UI, layouts, dialogs, animations
│   │   ├── data/           # Structured programs, testimonials, highlights
│   │   ├── hooks/          # Custom hooks (e.g., useReveal)
│   │   ├── pages/          # Home, About, Gallery, Testimonials, Contact
│   │   └── services/       # enquiryApi (REST client)
│   ├── index.html
│   └── package.json
│
├── backend/                # Spring Boot REST API
│   ├── src/main/java/      # Controllers, Entities, Repositories, Services
│   ├── src/main/resources/ # application.properties
│   ├── Dockerfile          # Production container setup (Render)
│   ├── pom.xml
│   └── README.md
│
└── README.md               # Monorepo documentation
```

---

## 1. Frontend (`frontend/`)

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS, DaisyUI components, Framer Motion animations
- **Features**:
  - Interactive admission enquiry dialog with DaisyUI dropdowns
  - Smooth reveal animations and responsive media gallery
  - Direct connection to backend admission enquiry REST endpoint (`/api/enquiries`)

### Running the Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 2. Backend (`backend/`)

- **Framework**: Spring Boot 3.3.4 (Java 17+)
- **Database**: Neon PostgreSQL / H2 in-memory fallback
- **Email Service**: Resend API over HTTPS (production-ready for cloud deployments like Render)
- **Reporting**: Apache POI Excel generator (`swarnabhoomi-enquiries.xlsx` attachment)

### Running the Backend
```bash
cd backend
mvn spring-boot:run
```

---

## Deployment Architecture

- **Frontend**: Vercel / Netlify
- **Backend**: Render
- **Database**: Neon PostgreSQL
- **Email Delivery**: Resend HTTPS API
