const sequelize = require('../config/sqliteDB');
const User = require('./User');
const Category = require('./Category');
const DynamicField = require('./DynamicField');
const Template = require('./Template');
const Enquiry = require('./Enquiry');
const Experience = require('./Experience');
const Rsvp = require('./Rsvp');
const WishBook = require('./WishBook');
const MediaAsset = require('./MediaAsset');
const CmsContent = require('./CmsContent');

// --- Associations ---
Category.hasMany(DynamicField, { foreignKey: 'category_id', as: 'fields', onDelete: 'CASCADE' });
DynamicField.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

Category.hasMany(Template, { foreignKey: 'category_id', as: 'templates' });
Template.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

Category.hasMany(Enquiry, { foreignKey: 'category_id', as: 'enquiries' });
Enquiry.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

Template.hasMany(Enquiry, { foreignKey: 'template_id', as: 'enquiries' });
Enquiry.belongsTo(Template, { foreignKey: 'template_id', as: 'template' });

Category.hasMany(Experience, { foreignKey: 'category_id', as: 'experiences' });
Experience.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

Template.hasMany(Experience, { foreignKey: 'template_id', as: 'experiences' });
Experience.belongsTo(Template, { foreignKey: 'template_id', as: 'template' });

User.hasMany(Experience, { foreignKey: 'created_by_user_id', as: 'experiences' });
Experience.belongsTo(User, { foreignKey: 'created_by_user_id', as: 'creator' });

Experience.hasMany(Rsvp, { foreignKey: 'experience_id', as: 'rsvps', onDelete: 'CASCADE' });
Rsvp.belongsTo(Experience, { foreignKey: 'experience_id', as: 'experience' });

Experience.hasMany(WishBook, { foreignKey: 'experience_id', as: 'wishes', onDelete: 'CASCADE' });
WishBook.belongsTo(Experience, { foreignKey: 'experience_id', as: 'experience' });

User.hasMany(MediaAsset, { foreignKey: 'uploaded_by_user_id', as: 'media' });
MediaAsset.belongsTo(User, { foreignKey: 'uploaded_by_user_id', as: 'uploader' });

module.exports = {
    sequelize,
    User,
    Category,
    DynamicField,
    Template,
    Enquiry,
    Experience,
    Rsvp,
    WishBook,
    MediaAsset,
    CmsContent
};
