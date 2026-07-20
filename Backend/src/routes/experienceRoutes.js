const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.get('/', experienceController.getAllExperiences);
router.get('/public/:slug', experienceController.getExperienceBySlug); // Public guest experience viewer
router.post('/', authenticateToken, requireRole(['superadmin', 'creator']), experienceController.createExperience);
router.put('/:id', authenticateToken, requireRole(['superadmin', 'creator']), experienceController.updateExperience);
router.delete('/:id', authenticateToken, requireRole(['superadmin']), experienceController.deleteExperience);

module.exports = router;
