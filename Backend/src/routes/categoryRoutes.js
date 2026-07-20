const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', authenticateToken, requireRole(['superadmin']), categoryController.createCategory);
router.put('/:id', authenticateToken, requireRole(['superadmin']), categoryController.updateCategory);
router.delete('/:id', authenticateToken, requireRole(['superadmin']), categoryController.deleteCategory);

module.exports = router;
