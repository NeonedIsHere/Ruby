const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    database: "ruby",
    username: "root",
    host: "localhost",
    dialect: "mysql",
    logging: false
})

module.exports = sequelize