const Sequelize = require('sequelize')
const db = require('../config/db')
module.exports = db.define('users',{
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    }
})