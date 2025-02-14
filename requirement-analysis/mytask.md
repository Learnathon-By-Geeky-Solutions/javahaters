Here’s a **low-level design (LLD)** for the specified part of the application. Each section outlines the features, API endpoints, database schema, and frontend components involved.

---

## **1. Login and Registration**

### **Features**
- **Login:**  
  - Login via email or phone number with a password.  
  - Login via social media (Google/Facebook).  
- **Registration:**  
  - Form collects user information: Full Name, Email/Phone, Current Address, Gender, DOB, and optional NID.  
- **Forget Password:**  
  - Reset password via email/phone verification.  

---

### **API Endpoints**
1. **Login**
   - `POST /api/auth/login`
     - Body: `{ "emailOrPhone": string, "password": string }`
     - Response: `{ "token": string, "user": { ...userDetails } }`

2. **Registration**
   - `POST /api/auth/register`
     - Body: `{ "fullName": string, "emailOrPhone": string, "address": string, "gender": string, "dob": string, "nid": string (optional) }`
     - Response: `{ "message": "Registration successful", "user": { ...userDetails } }`

3. **Forget Password**
   - `POST /api/auth/forget-password`
     - Body: `{ "emailOrPhone": string }`
     - Response: `{ "message": "Reset link or OTP sent" }`

4. **Social Login**
   - `POST /api/auth/social-login`
     - Body: `{ "provider": string, "token": string }`
     - Response: `{ "token": string, "user": { ...userDetails } }`

---

### **Database Schema**
**Users Table**  
```sql
CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fullName VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(15),
    password VARCHAR(255),
    address TEXT,
    gender ENUM('Male', 'Female', 'Other'),
    dob DATE,
    nid VARCHAR(20),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

### **Frontend Components**
1. **LoginForm.jsx**  
   - Inputs: Email/Phone, Password  
   - Button: Login  
   - Link: Forget Password  

2. **RegisterForm.jsx**  
   - Inputs: Full Name, Email/Phone, Address, Gender (Dropdown), DOB, NID (Optional)  
   - Button: Register  

3. **SocialLoginButton.jsx**  
   - Buttons for Google/Facebook Login  

---

## **2. Doctor List**

### **Features**
- **Navbar:** Navigation links to the Doctor List, Home, and other pages.  
- **All Doctor:** Displays doctor information (Name, ID, Hospital, Location, Visiting Hours, Online Status).  
- **Search:** Filters based on ID, Name, Hospital Name, or Area.  
- **Sort:** Alphabetically, Rating-wise, and by Visit Price.  
- **Which Doctor (AI Chat):** Quick navigation to AI Chat.  

---

### **API Endpoints**
1. **Fetch All Doctors**
   - `GET /api/doctors`
     - Query Params: `sort=rating|price|alphabetical`, `order=asc|desc`
     - Response: `{ "doctors": [ { ...doctorDetails } ] }`

2. **Search Doctor**
   - `GET /api/doctors/search`
     - Query Params: `id=string | name=string | hospital=string | area=string`
     - Response: `{ "doctors": [ { ...doctorDetails } ] }`

3. **Doctor Details**
   - `GET /api/doctors/:doctorId`
     - Response: `{ ...doctorDetails }`

---

### **Database Schema**
**Doctors Table**  
```sql
CREATE TABLE Doctors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    doctorID VARCHAR(20) UNIQUE,
    hospital VARCHAR(100),
    location VARCHAR(100),
    visitingHour VARCHAR(50),
    isOnline BOOLEAN DEFAULT 0,
    rating FLOAT,
    visitPrice DECIMAL(10, 2),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

### **Frontend Components**
1. **DoctorList.jsx**  
   - Displays all doctors with their information in a table or card layout.  

2. **DoctorSearchFilter.jsx**  
   - Inputs: ID, Name, Hospital Name, Area  
   - Dropdowns for Sorting  

3. **DoctorCard.jsx**  
   - Shows individual doctor info: Name, ID, Hospital, Location, Rating, Price, Online Status.  

4. **Navbar.jsx**  
   - Links to Doctor List, Chat with AI, and more.  

---

## **3. Chat with AI**

### **Features**
- **Chat History:** Displays past conversations.  
- **Chatbox:** Input box for typing queries and receiving AI responses.  

---

### **API Endpoints**
1. **Fetch Chat History**
   - `GET /api/chat/history`
     - Response: `{ "history": [ { "message": string, "timestamp": datetime } ] }`

2. **Send Message**
   - `POST /api/chat/send`
     - Body: `{ "message": string }`
     - Response: `{ "reply": string }`

---

### **Database Schema**
**ChatHistory Table**  
```sql
CREATE TABLE ChatHistory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    message TEXT,
    reply TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id)
);
```

---

### **Frontend Components**
1. **ChatHistory.jsx**  
   - List of past messages with timestamps.  

2. **Chatbox.jsx**  
   - Input box for user message.  
   - Display for AI response.  

---

This low-level design provides the foundational structure for implementing the login, registration, doctor listing, and AI chat functionalities. Let me know if you need further refinements or additional details!