const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

// SuperAdmin only routes
router.get('/', authenticateToken, requireRole(['superadmin']), userController.getAllUsers);
router.post('/', authenticateToken, requireRole(['superadmin']), userController.createUser);
router.put('/:id', authenticateToken, requireRole(['superadmin']), userController.updateUser);
router.delete('/:id', authenticateToken, requireRole(['superadmin']), userController.deleteUser);

module.exports = router;
