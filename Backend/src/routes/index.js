const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const categoryRoutes = require('./categoryRoutes');
const dynamicFieldRoutes = require('./dynamicFieldRoutes');
const templateRoutes = require('./templateRoutes');
const enquiryRoutes = require('./enquiryRoutes');
const experienceRoutes = require('./experienceRoutes');
const guestRoutes = require('./guestRoutes');
const mediaRoutes = require('./mediaRoutes');
const cmsRoutes = require('./cmsRoutes');
const userRoutes = require('./userRoutes');

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/fields', dynamicFieldRoutes);
router.use('/templates', templateRoutes);
router.use('/enquiries', enquiryRoutes);
router.use('/experiences', experienceRoutes);
router.use('/guest', guestRoutes);
router.use('/media', mediaRoutes);
router.use('/cms', cmsRoutes);
router.use('/users', userRoutes);

module.exports = router;
