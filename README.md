# Binorix Backend

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2016.0.0-brightgreen.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

Binorix Backend is the core server-side application powering the **Binorix** healthcare management platform.  
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

```
Binorix-backend/
│
├── doctor-services/
│   ├── auth-services/
│   └── doctor-core-services/
│
├── hospital-services/
│
├── pharmacy-services/
│
├── database/
│
├── .env
├── server.js
├── package.json
└── README.md
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/PRIEYAN/Binorix-backend.git
cd Binorix-backend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Create .env file
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/Binorix
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run the development server
```bash
npm start
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/doctor/auth/register` | Register a doctor | ❌ |
| `POST` | `/doctor/auth/login` | Doctor login | ❌ |
| `POST` | `/hospital/auth/register` | Register a hospital | ❌ |
| `POST` | `/hospital/auth/login` | Hospital login | ❌ |
| `POST` | `/pharmacy/auth/register` | Register a pharmacy | ❌ |
| `POST` | `/pharmacy/auth/login` | Pharmacy login | ❌ |
| `POST` | `/doctor/prescription` | Create prescription | ✅ |
| `GET` | `/doctor/prescription/:patientId` | Get prescriptions by patient | ✅ |
| `GET` | `/patient/:id` | Get patient details | ✅ |

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

1. Fork the repository# Binorix Backend

Binorix Backend is the core server-side application powering the **Binorix** healthcare management platform.  
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

Binorix-backend/
│── doctor-services/
│ ├── auth-services/
│ └── doctor-core-services/
│── hospital-services/
│── pharmacy-services/
│── database/
│── .env
│── server.js
│── package.json

yaml
Copy
Edit

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/PRIEYAN/Binorix-backend.git
cd Binorix-backend
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
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/Binorix
JWT_SECRET=your_jwt_secret
4️⃣ Run the development server
bash
Copy
Edit
npm start
📡 API Endpoints
Method	Endpoint	Description	Auth Required
POST	/doctor/auth/register	Register a doctor	❌
POST	/doctor/auth/login	Doctor login	❌
POST	/hospital/auth/register	Register a hospital	❌
POST	/hospital/auth/login	Hospital login	❌
POST	/pharmacy/auth/register	Register a pharmacy	❌
POST	/pharmacy/auth/login	Pharmacy login	❌
POST	/doctor/prescription	Create prescription	✅
GET	/doctor/prescription/:patientId	Get prescriptions by patient	✅
GET	/patient/:id	Get patient details	✅

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
