const mongoose = require('mongoose');
const { Experience } = require('../models');
const { handle200, handle201 } = require('../helper/successHandler');
const { handle404, handle500, formatSequelizeError, handle422 } = require('../helper/errorHandler');

const getAllExperiences = async (req, res) => {
    try {
        const isStaff = req.user && (req.user.role === 'superadmin' || req.user.role === 'creator');
        const whereClause = isStaff ? {} : { is_published: true };

        const experiences = await Experience.find(whereClause)
            .sort({ createdAt: -1 });
        return handle200(res, experiences);
    } catch (error) {
        return handle500(res, error);
    }
};

const getExperienceBySlug = async (req, res) => {
    try {
        const cleanSlug = req.params.slug.trim();
        const safeSlug = cleanSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const slugRegex = new RegExp('^' + safeSlug + '$', 'i');
        let experience = await Experience.findOne({ slug: slugRegex });

        if (!experience) {
            return handle404(res, 'Digital Experience not found');
        }

        // Safely increment view count
        try {
            experience.view_count = (experience.view_count || 0) + 1;
            await experience.save();
        } catch (e) {}

        return handle200(res, experience);
    } catch (error) {
        console.error("Error in getExperienceBySlug:", error);
        return handle500(res, error);
    }
};

const fs = require('fs');
const path = require('path');

const convertBase64DataUrlsToFiles = (dataObj) => {
    if (!dataObj || typeof dataObj !== 'object') return dataObj;
    const cleaned = Array.isArray(dataObj) ? [...dataObj] : { ...dataObj };

    const uploadsDir = path.join(__dirname, '../../public/uploads');
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    Object.keys(cleaned).forEach((key) => {
        const val = cleaned[key];
        if (typeof val === 'string' && val.trim().startsWith('data:')) {
            try {
                const str = val.trim();
                const commaIdx = str.indexOf(',');
                if (commaIdx !== -1) {
                    const header = str.substring(0, commaIdx);
                    const base64Data = str.substring(commaIdx + 1).replace(/[\r\n\s]/g, '');

                    let ext = 'png';
                    const lowerHeader = header.toLowerCase();
                    if (lowerHeader.includes('jpeg') || lowerHeader.includes('jpg')) ext = 'jpg';
                    else if (lowerHeader.includes('webp')) ext = 'webp';
                    else if (lowerHeader.includes('gif')) ext = 'gif';
                    else if (lowerHeader.includes('audio') || lowerHeader.includes('mpeg') || lowerHeader.includes('mp3')) ext = 'mp3';

                    const filename = `media_${Date.now()}_${Math.floor(Math.random() * 10000)}.${ext}`;
                    const filepath = path.join(uploadsDir, filename);
                    fs.writeFileSync(filepath, Buffer.from(base64Data, 'base64'));
                    cleaned[key] = `/uploads/${filename}`;
                    console.log(`[Base64 Converter SUCCESS] Saved ${key} to disk file: /uploads/${filename}`);
                }
            } catch (err) {
                console.warn(`[Base64 Converter WARNING] Failed to convert field ${key}:`, err.message);
            }
        } else if (val && typeof val === 'object') {
            cleaned[key] = convertBase64DataUrlsToFiles(val);
        }
    });

    return cleaned;
};

const createExperience = async (req, res) => {
    try {
        const payload = { ...req.body };
        if (req.user && req.user._id) {
            payload.created_by_user_id = req.user._id;
        }

        if (!payload.slug) {
            return res.status(400).json({ status: false, message: 'Slug is required' });
        }

        const cleanSlug = String(payload.slug).trim().toLowerCase();
        payload.slug = cleanSlug;

        // Auto-convert any legacy Base64 media data into disk files under /uploads/
        if (payload.data) {
            payload.data = convertBase64DataUrlsToFiles(payload.data);
        }

        if (payload.template_id && !mongoose.Types.ObjectId.isValid(payload.template_id)) {
            payload.template_slug = String(payload.template_id);
            delete payload.template_id;
        }
        if (payload.category_id && !mongoose.Types.ObjectId.isValid(payload.category_id)) {
            payload.category_slug = String(payload.category_id);
            delete payload.category_id;
        }

        let existing = await Experience.findOne({ slug: cleanSlug });
        if (existing) {
            existing.set(payload);
            existing.markModified('data');
            if (payload.custom_styles) existing.markModified('custom_styles');
            await existing.save();
            return handle200(res, existing, 'Experience updated successfully in MongoDB');
        }

        const experience = await Experience.create(payload);
        return handle201(res, experience, 'Experience created successfully in MongoDB');
    } catch (error) {
        console.error("Error creating/updating experience in MongoDB:", error);
        return handle500(res, error);
    }
};

const updateExperience = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) return handle404(res, 'Experience not found');
        
        experience.set(req.body);
        experience.markModified('data');
        if (req.body.custom_styles) experience.markModified('custom_styles');
        await experience.save();
        
        return handle200(res, experience, 'Experience updated successfully');
    } catch (error) {
        return formatSequelizeError(res, error);
    }
};

const deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) return handle404(res, 'Experience not found');
        await experience.deleteOne();
        return handle200(res, null, 'Experience deleted successfully');
    } catch (error) {
        return handle500(res, error);
    }
};

module.exports = {
    getAllExperiences,
    getExperienceBySlug,
    createExperience,
    updateExperience,
    deleteExperience
};
