const { DataTypes } = require('sequelize');
const sequelize = require('../config/sqliteDB');

const DynamicField = sequelize.define('DynamicField', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    field_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    field_type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'text'
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false
    },
    placeholder: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_required: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    options: {
        type: DataTypes.JSON,
        allowNull: true
    },
    display_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: true
});

module.exports = DynamicField;
