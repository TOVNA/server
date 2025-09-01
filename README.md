# Server – TOVNA Platform

This is the backend server for the TOVNA education platform. It is built with **Node.js**, **Express**, and **MongoDB**.  
It provides REST APIs for authentication, questionnaire management, goals/strategies, and student performance tracking.

---

## 🚀 Features
- **Authentication**
  - Google OAuth 2.0 login
  - JWT-based session management (access + refresh tokens)
- **User Management** (teachers, students, roles)
- **Questionnaire System**
  - Create questionnaires with multiple question types
  - Store answers linked to students and teachers
- **AI-Generated Goals & Strategies**
  - Generate student goals and strategies from questionnaire answers
  - Store and edit both AI-generated and manual goals
- **Performance Tracking**
  - Calculate academic, social, and behavioral scores over time

---

## 🛠️ Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Google OAuth 2.0
- Swagger (API documentation)

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/TOVNA/server
cd tovna-server
