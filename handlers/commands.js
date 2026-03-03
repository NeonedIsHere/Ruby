const { join } = require('path')
const loadCommands = require('../functions/loadCommands')

module.exports = (client) => {
    const commandDir = join(__dirname, '../commands')
    loadCommands(commandDir, client)
}