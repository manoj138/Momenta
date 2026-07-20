const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqliteDB');

const Rsvp = sequelize.define('Rsvp', {
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
    guest_email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    guest_phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    attending_status: {
        type: DataTypes.STRING,
        defaultValue: 'yes'
    },
    guest_count: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Rsvp;
