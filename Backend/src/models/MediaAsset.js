const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqliteDB');

const MediaAsset = sequelize.define('MediaAsset', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    uploaded_by_user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file_path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file_type: {
        type: DataTypes.STRING,
        defaultValue: 'image'
    },
    file_size: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mime_type: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = MediaAsset;
