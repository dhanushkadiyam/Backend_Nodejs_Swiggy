const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const vendorRoutes = require("./routes/vendorRoutes");
const firmRoutes = require("./routes/firmRoutes");
const productRoutes = require("./routes/productRoutes");

dotEnv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// ✅ CORS configuration
app.use(cors({
  origin: "https://react-dash-board-swiggy-clone.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Handle Preflight Requests
app.options("*", (req, res) => {
  res.sendStatus(200);
});

// ✅ Middleware for JSON
app.use(express.json());

// ✅ Routes
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'));

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Swiggy Clone Backend</h1>");
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ DB Error:", err));

// ✅ Starting Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
