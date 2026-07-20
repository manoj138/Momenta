const { CmsContent } = require('../models');
const { handle200, handle201 } = require('../helper/successHandler');
const { handle404, handle500, formatSequelizeError } = require('../helper/errorHandler');

const getCmsContentByKey = async (req, res) => {
    try {
        const cms = await CmsContent.findOne({ key: req.params.key });
        if (!cms) {
            return handle404(res, `CMS Content for key '${req.params.key}' not found`);
        }
        return handle200(res, cms);
    } catch (error) {
        return handle500(res, error);
    }
};

const getAllCmsContent = async (req, res) => {
    try {
        const allCms = await CmsContent.find({});
        return handle200(res, allCms);
    } catch (error) {
        return handle500(res, error);
    }
};

const upsertCmsContent = async (req, res) => {
    try {
        const { key, section_name, content } = req.body;
        let cms = await CmsContent.findOne({ key });
        if (cms) {
            cms.section_name = section_name || cms.section_name;
            cms.content = content || cms.content;
            await cms.save();
        } else {
            cms = await CmsContent.create({ key, section_name, content });
        }
        return handle200(res, cms, 'CMS content saved successfully');
    } catch (error) {
        return formatSequelizeError(res, error);
    }
};

module.exports = {
    getCmsContentByKey,
    getAllCmsContent,
    upsertCmsContent
};
