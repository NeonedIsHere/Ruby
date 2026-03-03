const fs = require('fs')
const path = require('path')
const logTitle = require('./logTitle')

function loadTables(sequelize, dir) {
    logTitle('Chargement des tables')
    const tables = {}

    fs.readdirSync(dir)
        .forEach(f => {
            const fullPath = path.join(dir, f)
            const stat = fs.statSync(fullPath)

            if (stat.isDirectory()) {
                Object.assign(tables, loadTables(sequelize, fullPath))
            } else if (f.endsWith('.js')) {
                const table = require(fullPath)
                console.log(`├── (WK-${process.pid}) [🛢️] » [SQL] Table ${table.name} chargé avec succès`)
                tables[table.name] = table
            }
        }
    )

    return tables
}

module.exports = loadTables