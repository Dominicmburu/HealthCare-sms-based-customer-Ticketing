# HealthCare-sms-based-customer-Ticketing
### **Documentation for HealthLine - Healthcare SMS-Based Customer Ticketing System**

---

## **Table of Contents**
1. **Overview**
2. **Purpose**
3. **Key Features**
4. **System Architecture**
5. **User Roles and Responsibilities**
6. **System Workflow**
7. **Technical Specifications**
8. **APIs and Integrations**
9. **Installation Guide**
10. **Usage Guide**
11. **Maintenance and Support**
12. **Future Enhancements**

---

### **1. Overview**
HealthLine is a comprehensive SMS-based ticketing system designed specifically for healthcare organizations. It enables efficient management of patient inquiries and support requests through multiple channels, including SMS, email, and online forms. The system ensures timely responses and clear communication between patients and healthcare staff.

---

### **2. Purpose**
The primary purpose of HealthLine is to streamline patient support processes for healthcare organizations, reduce response times, and improve patient satisfaction. It leverages SMS for real-time updates and communication, ensuring that patients remain informed about their ticket statuses.

---

### **3. Key Features**
- **Ticket Creation**: Patients can create support tickets via:
  - SMS
  - Email
  - Online forms
- **Ticket Management**:
  - Staff can assign, track, and resolve tickets.
  - Tickets can be escalated if necessary.
- **SMS-Based Updates**:
  - Patients receive automated SMS updates on ticket statuses.
  - Staff can send custom SMS replies for specific queries.
- **User Roles**:
  - Roles include Admin, Support Staff, and Medical Support.
  - Each role has specific permissions for managing tickets.
- **Dashboard**:
  - Displays metrics such as response times, resolution rates, and pending tickets.

---

### **4. System Architecture**
#### **4.1 Components**
- **Frontend**:
  - Web dashboard for administrators and support staff.
  - Online form for patients to create tickets.
- **Backend**:
  - API for handling ticket creation, updates, and status management.
  - Integration with SMS gateways (e.g., Africa’s Talking).
- **Database**:
  - Stores ticket information, user roles, and patient details.
- **SMS Gateway**:
  - Sends and receives SMS messages for ticket updates and communications.

#### **4.2 Architecture Diagram**
*(Include a diagram showing the interaction between components such as SMS gateway, backend API, and database.)*

---

### **5. User Roles and Responsibilities**
1. **Administrator**:
   - Configure system settings.
   - Assign roles to staff.
   - Monitor system performance via the dashboard.
2. **Support Staff**:
   - Respond to tickets.
   - Assign tickets to medical staff if required.
3. **Medical Support**:
   - Provide detailed medical advice or support as assigned.
4. **Patients**:
   - Create tickets and receive updates via SMS.

---

### **6. System Workflow**
1. **Ticket Creation**:
   - A patient sends an SMS, submits an online form, or sends an email.
   - The system generates a unique ticket ID and stores it in the database.
2. **Ticket Assignment**:
   - The ticket is automatically assigned to the appropriate department based on predefined rules or manually by staff.
3. **Response Management**:
   - Staff communicates with the patient via SMS.
   - Updates are logged in the system.
4. **Ticket Resolution**:
   - Once resolved, the ticket status is updated to “Closed.”
   - A final SMS update is sent to the patient.
5. **Reporting**:
   - Admins review metrics such as response times and resolution rates via the dashboard.

---

### **7. Technical Specifications**
- **Programming Languages**:
  - Backend: Node.js with TypeScript
  - Frontend: React.js
- **Database**: MongoDB
- **SMS Integration**: Africa’s Talking API
- **Hosting**: AWS (Amazon Web Services)
- **Authentication**: JWT (JSON Web Tokens) for secure user authentication.

---

### **8. APIs and Integrations**
#### **8.1 APIs**
1. **Ticket API**:
   - `POST /tickets`: Create a new ticket.
   - `GET /tickets/:id`: Retrieve ticket details.
   - `PATCH /tickets/:id`: Update ticket status or assign staff.
2. **User API**:
   - `POST /users`: Register a new user.
   - `POST /auth/login`: Authenticate user and retrieve a token.

#### **8.2 Integrations**
- **Africa’s Talking**: SMS sending and receiving.
- **Email Service**: (e.g., SendGrid) for email ticket creation.

---

### **9. Installation Guide**
### **9. Installation Guide**

#### **1. Prerequisites**
Ensure the following are installed and configured before proceeding:

1. **Node.js and npm**: Install the latest stable versions to run the backend.
2. **TypeScript**: Used for writing and transpiling the backend code.
3. **PostgreSQL**: A relational database for storing ticket and user data.
4. **Africa’s Talking API credentials**: Required for SMS sending and receiving.
5. **Git**: For cloning the project repository.
6. **API Testing Tool**: (e.g., Postman) to verify API endpoints during setup.
7. **Docker (optional)**: For containerized deployment of the application.
8. **Web Browser**: For accessing the frontend dashboard.
9. **Environment Variables**: Set up a `.env` file for sensitive credentials such as:
   - Database connection strings
   - Africa’s Talking API key
   - JWT secret key
   - Email service credentials (e.g., SendGrid)
10. **Code Editor**: (e.g., Visual Studio Code) for making modifications if needed.

---

#### **2. Installation Steps**

1. **Clone the Repository**:
   ```bash
   https://github.com/Dominicmburu/HealthCare-sms-based-customer-Ticketing.git
   ```

2. **Install Dependencies**:
   Navigate to the backend and frontend directories to install dependencies:
   ```bash
   pnpm install
   ```

3. **Set Up Database**:
   - Ensure PostgreSQL is installed and running.
   - Create a database named `healthline`.

4. **Configure Environment Variables**:
   Create a `.env` file in the project root directory and populate it with:
   ```plaintext
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
   JWT_SECRET=<your-jwt-secret>
   AFRICASTALKING_API_KEY=<your-africas-talking-api-key>
   AFRICASTALKING_USERNAME=<your-africas-talking-username>
   EMAIL_SERVICE_API_KEY=<your-email-service-api-key>
   ```
   
5. **Start Backend Server**:
   Compile TypeScript and start the server:
   ```bash
   pnpm run dev
   ```

6. **Run Frontend**:
   Navigate to the frontend directory and start the application:
   ```bash
   pnpm run dev
   ```

7. **Verify API Connectivity**:
   Test the APIs using a tool like Postman to ensure endpoints are responding correctly.

8. **Set Up SMS Gateway**:
   - Verify Africa’s Talking credentials.
   - Test sending and receiving SMS using their API.

---

### **10. Usage Guide**
1. **Creating Tickets**:
   - Send an SMS to the designated number.
   - Submit an online form with the issue details.
   - Email the support team at a specified address.
2. **Staff Actions**:
   - Log in to the dashboard.
   - View and assign tickets.
   - Send SMS replies or updates.
3. **Admin Actions**:
   - Configure system settings.
   - Generate reports on performance metrics.

---

### **11. Maintenance and Support**
- **Database Backups**: Perform weekly backups of the MongoDB database.
- **API Monitoring**: Use tools like Postman or New Relic for monitoring.
- **SMS Gateway Health**: Regularly test the SMS gateway integration.

---

### **12. Future Enhancements**
1. **Chatbot Integration**: Automate ticket creation and FAQs via an AI-powered chatbot.
2. **Multilingual Support**: Provide SMS updates in multiple languages.
3. **Mobile App**: Develop a mobile app for patients to track tickets.
4. **Analytics Dashboard**: Add advanced reporting and predictive analytics features.

---