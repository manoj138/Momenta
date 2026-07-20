const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const mediaController = require('../controllers/mediaController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Configure Cloudinary credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer Storage Engine for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'momenta-uploads',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp3', 'wav', 'ogg'],
        resource_type: 'auto' // crucial to support both image and audio assets
    }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), mediaController.uploadMedia);
router.get('/', mediaController.getAllMedia);
router.delete('/:id', authenticateToken, mediaController.deleteMedia);

module.exports = router;
