// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
require("dotenv").config();

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const MONGO_URI = process.env.MONGODB_URI; //MongoDB URI
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

// Configure multer for user uploads
const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(
      __dirname,
      "../client/user/user_uploaded_files"
    );
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
    cb(null, `${Date.now()}-${sanitizedFilename}`);
  },
});

const userUpload = multer({
  storage: userStorage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit
});

// Configure multer for admin uploads
const adminStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(
      __dirname,
      "../client/admin/admin_uploaded_files"
    );
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
    cb(null, `${Date.now()}-${sanitizedFilename}`);
  },
});

const adminUpload = multer({
  storage: adminStorage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit
});

// Allowed MIME types
const allowedMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "image/jpeg",
  "image/png",
  "image/gif",
];

// Routes
// Registration endpoint
app.post("/api/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // Validate request body
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use!" });
    }

    // Create new user
    const newUser = new User({ firstname, lastname, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  // Validate request body
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email: username });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Validate password (For now, plaintext. Use hashing like bcrypt in production.)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    res.status(200).json({
      message: "Login successful!",
      redirectUrl: user.isAdmin
        ? "../public/pages/admin.html"
        : "../public/pages/home.html",
      isAdmin: user.isAdmin, // Include isAdmin in the response
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Contact form submission endpoint
app.post("/submit_contact", (req, res) => {
  const { name, email, message } = req.body;

  // Validate request body
  if (!name || !email || !message) {
    console.error("Validation error: All fields are required!");
    return res.status(400).json({ message: "All fields are required!" });
  }

  // Read existing tickets
  const ticketsFilePath = path.join(__dirname, "../tickets/tickets.json");
  fs.readFile(ticketsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading tickets file:", err);
      return res.status(500).json({ message: "Internal server error." });
    }

    let tickets;
    try {
      tickets = JSON.parse(data);
    } catch (parseErr) {
      console.error("Error parsing tickets file:", parseErr);
      return res.status(500).json({ message: "Internal server error." });
    }

    const newTicket = { name, email, message, date: new Date().toISOString() };
    tickets.push(newTicket);

    // Save updated tickets
    fs.writeFile(ticketsFilePath, JSON.stringify(tickets, null, 2), (err) => {
      if (err) {
        console.error("Error writing tickets file:", err);
        return res.status(500).json({ message: "Internal server error." });
      }

      res.status(201).json({ message: "Contact form submitted successfully!" });
    });
  });
});

// Notes upload endpoint
app.post("/submit_notes", userUpload.array("files", 10), (req, res) => {
  const notesUploadFilePath = path.join(
    __dirname,
    "../client/user/notes_upload.json"
  );
  const newNote = req.body;

  // Add file paths to the note data
  newNote.files = req.files.map((file) => file.path);
  newNote.date = new Date().toISOString();

  // Validate file types
  for (const file of req.files) {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return res.status(400).json({
        message: `Invalid file type for "${file.originalname}". Allowed types: PDF, DOC, DOCX, TXT, and images.`,
      });
    }
  }

  // Ensure the notes JSON file exists
  if (!fs.existsSync(notesUploadFilePath)) {
    fs.writeFileSync(notesUploadFilePath, JSON.stringify([], null, 2));
  }

  // Read existing notes
  fs.readFile(notesUploadFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error." });
    }

    let notes = JSON.parse(data);
    notes.push(newNote);

    // Save updated notes
    fs.writeFile(notesUploadFilePath, JSON.stringify(notes, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error." });
      }

      res.status(201).json({ message: "Notes submitted successfully!" });
    });
  });
});

// Admin upload endpoint
app.post("/api/admin_upload", adminUpload.array("files", 10), (req, res) => {
  const adminUploadFilePath = path.join(
    __dirname,
    "../client/admin/admin_upload.json"
  );
  const newUpload = req.body;

  // Add file paths to the upload data
  newUpload.files = req.files.map((file) => file.path);
  newUpload.date = new Date().toISOString();

  // Validate file types
  for (const file of req.files) {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return res.status(400).json({
        message: `Invalid file type for "${file.originalname}". Allowed types: PDF, DOC, DOCX, TXT, and images.`,
      });
    }
  }

  // Ensure the admin JSON file exists
  if (!fs.existsSync(adminUploadFilePath)) {
    fs.writeFileSync(adminUploadFilePath, JSON.stringify([], null, 2));
  }

  // Read existing uploads
  fs.readFile(adminUploadFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error." });
    }

    let uploads = JSON.parse(data);
    uploads.push(newUpload);

    // Save updated uploads
    fs.writeFile(
      adminUploadFilePath,
      JSON.stringify(uploads, null, 2),
      (err) => {
        if (err) {
          return res.status(500).json({ message: "Internal server error." });
        }

        res
          .status(201)
          .json({ message: "Admin upload submitted successfully!" });
      }
    );
  });
});

// Fetch all users (Admin only)
app.get("/api/users", async (req, res) => {
  try {
    console.log("GET /api/users called"); // Log when the endpoint is hit
    const users = await User.find({}, { password: 0 }); // Exclude passwords
    console.log("Fetched users:", users); // Log fetched users for debugging
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Update isAdmin property (Admin only)
app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.body;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID!" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { isAdmin },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({ message: "User updated successfully!", user });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Add user endpoint (Admin only)
app.post("/api/users", async (req, res) => {
  const { firstname, lastname, email, password, isAdmin } = req.body;

  // Validate request body
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use!" });
    }

    // Create new user
    const newUser = new User({ firstname, lastname, email, password, isAdmin });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User added successfully!", user: newUser });
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(
    `Server running on http://127.0.0.1:5500/public/index.html# or http://localhost:${PORT}`
  );
});
