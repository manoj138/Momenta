const { MediaAsset } = require('../models');
const { handle200, handle201 } = require('../helper/successHandler');
const { handle400, handle500, handle404 } = require('../helper/errorHandler');

const uploadMedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ status: false, message: 'No file uploaded' });
        }

        const media = await MediaAsset.create({
            uploaded_by_user_id: req.user ? req.user.id : null,
            filename: req.file.filename,
            file_path: `/uploads/${req.file.filename}`,
            file_type: req.file.mimetype.startsWith('image/') ? 'image' : (req.file.mimetype.startsWith('audio/') ? 'audio' : 'other'),
            file_size: req.file.size,
            mime_type: req.file.mimetype
        });

        return handle201(res, media, 'File uploaded successfully');
    } catch (error) {
        return handle500(res, error);
    }
};

const getAllMedia = async (req, res) => {
    try {
        const mediaList = await MediaAsset.findAll({
            order: [['createdAt', 'DESC']]
        });
        return handle200(res, mediaList);
    } catch (error) {
        return handle500(res, error);
    }
};

const deleteMedia = async (req, res) => {
    try {
        const media = await MediaAsset.findByPk(req.params.id);
        if (!media) return handle404(res, 'Media not found');
        await media.destroy();
        return handle200(res, null, 'Media asset deleted successfully');
    } catch (error) {
        return handle500(res, error);
    }
};

module.exports = {
    uploadMedia,
    getAllMedia,
    deleteMedia
};
