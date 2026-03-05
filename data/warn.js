const { DataTypes } = require("sequelize");
const sequelize = require("../handlers/sequelize");

const Warn = sequelize.define('Warn', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    guild: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING(35),
        allowNull: false,
    },
    target: {
        type: DataTypes.STRING(35),
        allowNull: false,
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Aucune raison spécifier"
    }
},  {
    tableName: "warn",
    timestamps: true
})

module.exports = Warn