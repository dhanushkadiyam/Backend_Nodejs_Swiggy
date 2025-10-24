const express = require('express');
const firmController= require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// Use upload.single('image') here in the route
router.post('/add-firm', verifyToken, firmController.addFirm);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.setHeader('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/:firmId', firmController.deleteFirmById);

module.exports = router;
