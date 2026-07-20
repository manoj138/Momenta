const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, requireRole(['superadmin', 'creator']), enquiryController.getAllEnquiries);
router.post('/', enquiryController.createEnquiry); // Public customer submission
router.put('/:id/status', authenticateToken, requireRole(['superadmin', 'creator']), enquiryController.updateEnquiryStatus);
router.delete('/:id', authenticateToken, requireRole(['superadmin']), enquiryController.deleteEnquiry);

module.exports = router;
