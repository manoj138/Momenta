const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mediaController = require('../controllers/mediaController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Configure Multer Storage Engine for Local Disk Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let subFolder = 'others';
        if (file.mimetype.startsWith('image/')) {
            subFolder = 'images';
        } else if (file.mimetype.startsWith('audio/')) {
            subFolder = 'audio';
        }
        const uploadPath = path.join(process.cwd(), 'public', 'uploads', subFolder);
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const sanitizeName = (file.originalname || 'file').replace(/[^a-zA-Z0-9.-]/g, '_');
        const uniqueName = `${Date.now()}-${sanitizeName}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

router.post('/upload', upload.single('file'), mediaController.uploadMedia);
router.get('/', mediaController.getAllMedia);
router.delete('/:id', authenticateToken, mediaController.deleteMedia);

module.exports = router;

