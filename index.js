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

app.use(cors({
  origin: true,        // reflect the Origin header (allows any site)
  credentials: true,   // sets Access-Control-Allow-Credentials: true
}));


app.use(express.json());

// Routes
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);
app.use("/uploads", express.static("uploads"));

// Default
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Swiggy Clone Backend</h1>");
});

// Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ DB Error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
