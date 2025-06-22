# 📇 Contact Keeper App

A full-stack contact management application built with **Node.js**, **Express**, **MongoDB**, and **React**. Users can register, log in, and manage their personal list of contacts securely.

---

## 🚀 Features

- 🔐 User Authentication with JWT
- 🧠 Secure Password Hashing (bcrypt)
- 📬 Add, edit, and delete contacts
- ✅ Form validation with Express Validator
- 📦 RESTful API with Express
- 🗃 MongoDB Atlas integration
- 📧 Email feature with Nodemailer (optional)
- ⚡ Concurrent server/client development
- 💅 Clean UI (Tailwind, Bootstrap, or plain CSS)

---

## 🛠 Tech Stack

### Frontend
- React
- Context API
- PropTypes
- Axios
- React Hooks

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- Express Validator
- Bcrypt.js

### Dev Tools
- Nodemon
- Concurrently

## Preview
Landing Page


![homepage](https://github.com/user-attachments/assets/855383c9-6796-44d4-93cf-a137ef933ee9)

Home Page


![HomePage1](https://github.com/user-attachments/assets/a9b2e99b-7fb5-4ad5-87f7-4d54fc4b98bb)



## 📂 Project Structure
contactkeeper/
├── client/ # React frontend
│ └── src/
│ ├── components/
│ ├── context/
│ ├── pages/
│ ├── utils/
│ └── App.js
├── config/
│ └── default.json # Mongo URI & JWT secret
├── models/
│ ├── User.js
│ └── Contact.js
├── routes/
│ ├── auth.js
│ ├── users.js
│ └── contacts.js
├── middleware/
│ └── auth.js # JWT middleware
├── server.js
├── package.json
└── README.md

##  Install backend dependencies and fronend dependencies
npm install


## Add your environment config
Create a default.json file inside /config folder:

json
Copy
Edit
{
  "mongoURI": "your-mongodb-uri",
  "jwtSecret": "yoursecretkey"
}
🧑‍💻 Author
Emmanuel Armah Sakyi
GitHub | LinkedIn
