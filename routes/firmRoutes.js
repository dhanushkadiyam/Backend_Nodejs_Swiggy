const express = require('express');
const firmController= require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');
const path = require('path');

const { upload } = firmController;

const router = express.Router();

// Use upload.single('image') here in the route (verifyToken first, then file upload)
router.post('/add-firm', verifyToken, upload.single('image'), firmController.addFirm);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.setHeader('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/:firmId', firmController.deleteFirmById);

module.exports = router;
