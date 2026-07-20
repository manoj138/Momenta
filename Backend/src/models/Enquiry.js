const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqliteDB');

const Enquiry = sequelize.define('Enquiry', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    client_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    client_email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    client_phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    template_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    form_data: {
        type: DataTypes.JSON,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'new'
    },
    assigned_to_user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Enquiry;
