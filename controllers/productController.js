const Product = require("../models/Product");
const multer = require('multer');
const Firm = require("../models/Firm");
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
    try {
        const { productName, price, category, bestSeller, description} = req.body;
        const image = req.file ? req.file.filename : undefined;

        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({ message: 'Firm not found' });
        }

        const product = new Product({
            productName,
            price,
            category,
            bestSeller,
            description,
            firm: firm._id,
            image
        });


        const savedProduct = await product.save();
        firm.products.push(savedProduct._id);
        await firm.save();

        res.status(200).json({ message: 'Product added successfully', product: savedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getProductByFirm = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if (!firm) {
            return res.status(404).json({ message: 'Firm not found' });
        }
        const restaurantName = firm.firmName;
        const products = await Product.find({ firm: firm._id });
        res.status(200).json({ restaurantName, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteProductById = async(req,res)=>{
    try{
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if(deletedProduct){
            res.status(200).json({message:"Product deleted successfully"});
        }
        else{
            res.status(404).json({message:"Product not found"});
        }
    }
    catch{
        res.status(500).json({error: 'Internal server error'});
    }
}

module.exports = { addProduct: [upload.single('image'), addProduct], getProductByFirm, deleteProductById };
