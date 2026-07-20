const express = require('express');
const router = express.Router();
const cmsController = require('../controllers/cmsController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.get('/', cmsController.getAllCmsContent);
router.get('/:key', cmsController.getCmsContentByKey);
router.post('/upsert', authenticateToken, requireRole(['superadmin']), cmsController.upsertCmsContent);

module.exports = router;
