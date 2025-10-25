const express = require("express");
const dotEnv = require("dotenv");
const mongoose= require("mongoose");
const vendorRoutes = require("./routes/vendorRoutes");
const bodyParser = require("body-parser");
const firmRoutes = require("./routes/firmRoutes");
const productRoutes = require("./routes/productRoutes");
const path = require("path");
const cors = require("cors");

const app = express();
dotEnv.config();

const PORT = process.env.PORT || 4000;

app.use(cors());


//octacoder
app.use(express.json());
app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes);
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI)
.then(() =>console.log("MongoDB connected successfully!"))
.catch((error) => console.log(error));


app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}`);
} );

app.use( '/',(req,res)=>{
    res.send("<h1>Welcome to Swiggy Clone Backend</h1>");
})