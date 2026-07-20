const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqliteDB');

const WishBook = sequelize.define('WishBook', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    experience_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    guest_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true
});

module.exports = WishBook;
