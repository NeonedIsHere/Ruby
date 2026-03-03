const { Sequelize } = require('sequelize')
const fs = require('fs')
const path = require('path')
const loadTables = require('../functions/loagTables')
const sequelize = require('./sequelize')
const config = require('../config.json')
const logTitle = require('../functions/logTitle')

const tables = loadTables(sequelize, path.join(__dirname, '../data'))

sequelize.authenticate()
    .then(async () => {
        logTitle("Connexion à la base de donnée")
        console.log(`├── (WK-${process.pid}) [🛢️] » [SQL] Connexion MySQL réussie`)
        await sequelize.sync({ alter: true })
    })
    .then(() => {
        console.log(`├── (WK-${process.pid}) [🛢️] » [SQL] Tables synchronisées`)
        console.log('└──' + '─'.repeat(60))
    })
    .catch((err) => console.log(`(WK-${process.pid}) [🛢️] » [SQL] Connexion MySQL échouer:`, err))

module.exports = { sequelize, tables }