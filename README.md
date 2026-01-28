# Zypher Backend

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2016.0.0-brightgreen.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

Zypher Backend is the core server-side application powering the **Zypher** healthcare management platform.  
It provides secure APIs for managing doctors, hospitals, pharmacies, and patients, including blockchain-based prescription storage for enhanced security and transparency.

## 🚀 Features

- **Authentication & Authorization**
  - Secure JWT-based authentication for doctors, hospitals, and pharmacies
  - Role-based access control

- **Healthcare Entity Management**
  - Doctor registration & login
  - Hospital registration & login
  - Pharmacy registration & login
  - Patient record search & retrieval

- **Prescription Management**
  - Create and manage prescriptions
  - Store prescription data on blockchain for immutability
  - Retrieve prescriptions by patient

- **Blockchain Integration**
  - Web3 integration for decentralized prescription storage
  - Ethereum-compatible smart contract interaction

- **Secure Data Handling**
  - Password hashing with bcrypt
  - Environment variables for sensitive configuration

---

## 🛠 Tech Stack

- **Backend Framework:** [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with Mongoose ORM
- **Blockchain:** [Web3.js](https://web3js.readthedocs.io/) for Ethereum integration
- **Authentication:** [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) (JWT)
- **Security:** [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing
- **Environment Management:** [dotenv](https://www.npmjs.com/package/dotenv)
- **CORS Handling:** [cors](https://www.npmjs.com/package/cors)

---


## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/PRIEYAN/Zypher-backend.git
cd Zypher-backend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Create .env file
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/Zypher
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run the development server
```bash
npm start
```

---


*(More endpoints are documented in the code)*

---

## 🛡 Security Notes

- Always use HTTPS in production
- Keep your `.env` file private and never commit it to GitHub
- Rotate JWT secrets and blockchain keys periodically

---

## 📜 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository# Zypher Backend

Zypher Backend is the core server-side application powering the **Zypher** healthcare management platform.  
It provides secure APIs for managing doctors, hospitals, pharmacies, and patients, including blockchain-based prescription storage for enhanced security and transparency.

## 🚀 Features

- **Authentication & Authorization**
  - Secure JWT-based authentication for doctors, hospitals, and pharmacies
  - Role-based access control

- **Healthcare Entity Management**
  - Doctor registration & login
  - Hospital registration & login
  - Pharmacy registration & login
  - Patient record search & retrieval

- **Prescription Management**
  - Create and manage prescriptions
  - Store prescription data on blockchain for immutability
  - Retrieve prescriptions by patient

- **Blockchain Integration**
  - Web3 integration for decentralized prescription storage
  - Ethereum-compatible smart contract interaction

- **Secure Data Handling**
  - Password hashing with bcrypt
  - Environment variables for sensitive configuration

---

## 🛠 Tech Stack

- **Backend Framework:** [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with Mongoose ORM
- **Blockchain:** [Web3.js](https://web3js.readthedocs.io/) for Ethereum integration
- **Authentication:** [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) (JWT)
- **Security:** [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing
- **Environment Management:** [dotenv](https://www.npmjs.com/package/dotenv)
- **CORS Handling:** [cors](https://www.npmjs.com/package/cors)

---

## 📂 Project Structure

---
```bash
Zypher-backend/
├── src/
│   ├── controllers/
│   │   ├── doctor.authController.js
│   │   ├── doctor.coreController.js
│   │   ├── hospital.authController.js
│   │   ├── hospital.coreController.js
│   │   ├── patient.authController.js
│   │   ├── patient.coreController.js
│   │   ├── pharmacy.authController.js
│   │   ├── pharmacy.coreController.js
│   │   └── index.js
│   ├── services/
│   │   ├── doctor.services/
│   │   │   ├── auth.services.js
│   │   │   ├── core.services.js
│   │   │   └── index.js
│   │   ├── hospital.services/
│   │   │   ├── auth.services.js
│   │   │   ├── core.services.js
│   │   │   └── index.js
│   │   ├── patient.services/
│   │   │   ├── auth.services.js
│   │   │   ├── core.services.js
│   │   │   └── index.js
│   │   └── pharmacy.services/
│   │       ├── auth.services.js
│   │       ├── core.services.js
│   │       └── index.js
│   ├── models/
│   │   ├── doctorDB.js
│   │   ├── hospitalDB.js
│   │   ├── patientDB.js
│   │   ├── pharmacyDB.js
│   │   ├── prescriptionDB.js
│   │   ├── prescriptionQR-DB.js
│   │   └── index.js
│   ├── routes/
│   │   ├── doctor.auth.routes.js
│   │   ├── doctor.core.routes.js
│   │   ├── hospital.auth.routes.js
│   │   ├── hospital.core.routes.js
│   │   ├── patient.auth.routes.js
│   │   ├── patient.core.routes.js
│   │   ├── patient.edit.routes.js
│   │   ├── pharmacy.auth.routes.js
│   │   ├── pharmacy.core.routes.js
│   │   ├── jwt.routes.js
│   │   └── index.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   └── index.js
│   ├── utils/
│   │   ├── jwt.js
│   │   └── index.js
│   ├── dbconfig/
│   │   └── mongodb.js
│   └── index.js
├── .env
├── server.js
├── package.json
├── README.md
└── ARCHITECTURE_FLOWCHART.md
---
```

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/PRIEYAN/Zypher-backend.git
cd Zypher-backend
2️⃣ Install dependencies
bash
Copy
Edit
npm install
3️⃣ Create .env file
env
Copy
Edit
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/Zypher
JWT_SECRET=your_jwt_secret
4️⃣ Run the development server
bash
Copy
Edit
npm start
📡 API Endpoints


DOCTOR ROUTES

http://localhost:5050/doctor/auth/signin
http://localhost:5050/doctor/auth/login
http://localhost:5050/doctor/auth/getDoctorDetails
http://localhost:5050/doctor/auth/logout


http://localhost:5050/doctor/prescription/getPatientDetails - to get check whether the patient registered in app or not
http://localhost:5050/doctor/prescription/newPrescription - to create new prescription

http://localhost:5050/doctor/prescription/getPrescriptionDetails - to get all prescription details of a doctor
http://localhost:5050/doctor/prescription/completedPrescription - to reject a prescription

http://localhost:5050/doctor/prescription/prescriptionRequest - to approve a prescription request


HOSPITAL ROUTES

http://localhost:5050/hospital/auth/signin
http://localhost:5050/hospital/auth/login
http://localhost:5050/hospital/core/getDoctorDetails - to get all doctors of a hospital
http://localhost:5050/hospital/core/viewPrescription/:doctorWallet - to view all prescriptions
http://localhost:5050/hospital/auth/getHospital - to get all hospitals



PHARMACY ROUTES
http://localhost:5050/pharmacy/auth/signin
http://localhost:5050/pharmacy/auth/login



PATIENT ROUTES
http://localhost:5050/patient/auth/signin
http://localhost:5050/patient/auth/login
http://localhost:5050/patient/core/prescriptionQR
http://localhost:5050/patient/edit-details

JWT ROUTES
http://localhost:5050/api/jwt/:ROLE

(More endpoints are documented in the code)

🛡 Security Notes
Always use HTTPS in production.

Keep your .env file private and never commit it to GitHub.

Rotate JWT secrets and blockchain keys periodically.

📜 License
This project is licensed under the MIT License.

🤝 Contributing
Contributions are welcome!

Fork the repository

Create your feature branch (git checkout -b feature-name)

Commit your changes (git commit -m "Description")

Push to your branch (git push origin feature-name)

Create a Pull Request

Maintainer: Prieyan MN


If you want, I can also **add GitHub badges for Node version, build status, and license**
2. Create your feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Description"`)
4. Push to your branch (`git push origin feature-name`)
5. Create a Pull Request

**Maintainer:** [Prieyan MN](https://github.com/PRIEYAN)
