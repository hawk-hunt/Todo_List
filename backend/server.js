/**
 * Express Server - MVC Architecture
 * 
 * Entry point for the backend API
 * - Express app initialization
 * - MongoDB/Mongoose connection
 * - Route registration
 * - Error handling middleware
 * 
 * Architecture:
 * Models → Routes → Middleware → Controllers (in route handlers)
 */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// Initialize Express app
const app = express();

// ==================== MIDDLEWARE ====================
// CORS: Allow React frontend to communicate with backend
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

// Body parser: Convert JSON request bodies to objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== ROUTES ====================
// Authentication routes (register, login)
app.use("/api/auth", authRoutes);

// User routes (dashboard, profile, etc - protected)
app.use("/api/user", userRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// ==================== ERROR HANDLERS ====================
// 404 - Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// ==================== DATABASE & SERVER ====================
async function startServer() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI or MONGO_URI environment variable is not set');
    }
    
    await mongoose.connect(mongoUri);
    console.log("✓ MongoDB connected");

    // Start Express server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on http://localhost:${PORT}`);
      console.log(`\n📝 API Endpoints:`);
      console.log(`   POST   /api/auth/register           - Register new user`);
      console.log(`   POST   /api/auth/login              - Login user`);
      console.log(`   GET    /api/user/dashboard          - Get user dashboard (protected)`);
      console.log(`   GET    /api/health                  - Health check\n`);
    });
  } catch (error) {
    console.error("✗ Server startup error:", error.message);
    process.exit(1);
  }
}

startServer();