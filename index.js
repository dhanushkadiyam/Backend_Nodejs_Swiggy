const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const vendorRoutes = require("./routes/vendorRoutes");
const firmRoutes = require("./routes/firmRoutes");
const productRoutes = require("./routes/productRoutes");
const path = require("path");
const cors = require("cors");

const app = express();
dotEnv.config();

const PORT = process.env.PORT || 4000;

// CORS middleware
app.use(cors({
  origin: [
    "https://react-dash-board-swiggy-clone.vercel.app",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware
app.use(express.json());

// Static and Routes
app.use('/uploads', express.static('uploads'));
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Swiggy Clone Backend</h1>");
});

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully!"))
.catch(error => console.log(error));

// Server Start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
