require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    client: mongoose.connection.getClient(),
    collectionName: 'sessions'
  }),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { 
    type: String, 
    unique: true, 
    required: true 
  },
  avatar: String,
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const User = mongoose.model("User", UserSchema);

// Authentication Route
app.post('/api/auth/google', async (req, res) => {
  const { name, email, picture } = req.body;
  console.log("Received user data:", { name, email, picture });  // Debugging line

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name,
        email,
        avatar: picture
      });
      await user.save();
      console.log("New user created:", user);  // Debugging line
    } else {
      console.log("User found:", user);  // Debugging line
    }

    req.session.userId = user._id;

    res.json({
      name: user.name,
      email: user.email,
      picture: user.avatar
    });
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(500).json({ message: "Server error during authentication" });
  }
});

// Logout Route
app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Could not log out" });
    }
    res.clearCookie('connect.sid');
    res.json({ message: "Logged out successfully" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
