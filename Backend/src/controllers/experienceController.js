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
        const slugRegex = new RegExp('^' + cleanSlug + '$', 'i');
        let experience = await Experience.findOne({ slug: slugRegex });

        if (!experience) {
            if (cleanSlug.toLowerCase() === 'vinit-dada-birthday') {
                experience = await Experience.create({
                    slug: 'vinit-dada-birthday',
                    template_slug: 'birthday-belated-apology',
                    category_slug: 'birthday',
                    title: "Vinit Dada's Birthday Experience",
                    client_name: 'Vinit Dada',
                    is_published: true,
                    data: {
                        personName: 'Vinit Dada',
                        petName: 'Vinit Dada',
                        secretPin: '',
                        lateReason: 'Finding the perfect words for someone as special as you took a little extra time! ✨',
                        letterText: `Dearest Vinit Dada,\n\nI know I missed the exact clock tick of your birthday, but please know that every single beat of my heart is always celebrating you.\n\nYou bring so much sunshine, laughter, and magic into my life that a single day isn't enough to celebrate you anyway. So consider this the start of your extended birthday week!\n\nHappy Birthday to my favorite person in the world! 💖`,
                        favNotification: 'A SPECIAL SURPRISE CRAFTED FOR VINIT DADA 💖',
                        stayCute: 'HAPPY BELATED BIRTHDAY TO VINIT DADA 🎂✨',
                        iloveYou: 'ONCE AGAIN, SORRY FOR BEING LATE! 🥺 HAPPY BIRTHDAY VINIT DADA! 🎉💖',
                        meanToMe: 'Finding the perfect words took a little extra time, but my wishes for you are timeless. ❤️',
                        scratchTitle: 'SURPRISE GIFT COUPON 🎁',
                        scratchMessage: "I know I was a bit late, but you'll always be my #1! Enjoy your special week 🎉✨",
                        bgMusic: 'https://assets.mixkit.co/music/preview/mixkit-romantic-sunburst-241.mp3',
                        photo1: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
                        photo2: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
                        photo3: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80',
                        photo4: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80',
                        photo5: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80'
                    }
                });
            } else {
                return handle404(res, 'Digital Experience not found');
            }
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

const createExperience = async (req, res) => {
    try {
        const payload = { ...req.body };
        if (payload.slug) {
            const existing = await Experience.findOne({ slug: payload.slug });
            if (existing) {
                existing.set(payload);
                existing.markModified('data');
                if (payload.custom_styles) existing.markModified('custom_styles');
                await existing.save();
                return handle200(res, existing, 'Experience updated successfully');
            }
        }
        if (payload.template_id && !mongoose.Types.ObjectId.isValid(payload.template_id)) {
            payload.template_slug = String(payload.template_id);
            delete payload.template_id;
        }
        if (payload.category_id && !mongoose.Types.ObjectId.isValid(payload.category_id)) {
            payload.category_slug = String(payload.category_id);
            delete payload.category_id;
        }
        const experience = await Experience.create(payload);
        return handle201(res, experience, 'Experience created successfully');
    } catch (error) {
        console.error("Error creating experience:", error);
        return formatSequelizeError(res, error);
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
