const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyParser.json());


// Resume Upload Configuration
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => cb(null, file.originalname),
  });
  const upload = multer({ storage });

// Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "mockinterview",
});

db.connect((err) => {
    if (err) console.error("DB connection error:", err);
    else console.log("Database connected");
  });

  // API Route: Upload Resume
app.post("/upload-resume", upload.single("resume"), (req, res) => {
    res.json({ message: "Resume uploaded successfully", questions: [
        "Tell me about yourself.",
        "What are your strengths?",
        "Why do you want this job?",
        "Describe a challenging project you worked on.",
        "Where do you see yourself in 5 years?"
      ] 
    });
  });

// API Route: Submit Interview Responses (Hardcoded Result)
app.post("/submit-interview", (req, res) => {
    res.json({ message: "Interview Completed", result: "100% Selected!" });
  });
  
  // Start Server
  app.listen(5000, () => console.log("Server running on port 5000"));
  