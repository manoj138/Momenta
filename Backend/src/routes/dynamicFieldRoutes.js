const express = require('express');
const router = express.Router();
const dynamicFieldController = require('../controllers/dynamicFieldController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.get('/category/:categoryId', dynamicFieldController.getFieldsByCategory);
router.post('/', authenticateToken, requireRole(['superadmin']), dynamicFieldController.createField);
router.put('/:id', authenticateToken, requireRole(['superadmin']), dynamicFieldController.updateField);
router.delete('/:id', authenticateToken, requireRole(['superadmin']), dynamicFieldController.deleteField);

module.exports = router;
