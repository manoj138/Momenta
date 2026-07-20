const express = require('express');
const router = express.Router();
const guestInteractionController = require('../controllers/guestInteractionController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/rsvp', guestInteractionController.submitRsvp);
router.get('/rsvp/:experienceId', authenticateToken, guestInteractionController.getRsvpsByExperience);
router.post('/wish', guestInteractionController.submitWish);
router.get('/wish/:experienceId', guestInteractionController.getWishesByExperience);

module.exports = router;
