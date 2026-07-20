const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.get('/', templateController.getAllTemplates);
router.get('/:id', templateController.getTemplateById);
router.post('/', authenticateToken, requireRole(['superadmin']), templateController.createTemplate);
router.put('/:id', authenticateToken, requireRole(['superadmin']), templateController.updateTemplate);
router.delete('/:id', authenticateToken, requireRole(['superadmin']), templateController.deleteTemplate);

module.exports = router;
