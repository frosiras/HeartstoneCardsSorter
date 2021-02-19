const Sequelize = require('sequelize')
const db = require('../config/db')
module.exports = db.define('cards',{
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cost: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    attack: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    health: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    img: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    }
})