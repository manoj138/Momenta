const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, enquiryController.getAllEnquiries);
router.post('/', enquiryController.createEnquiry); // Public customer submission
router.put('/:id/status', authenticateToken, enquiryController.updateEnquiryStatus);
router.delete('/:id', authenticateToken, enquiryController.deleteEnquiry);

module.exports = router;
