const { join } = require('path')
const  loadEvents = require('../functions/loadEvents')

module.exports = (client) => {
    const eventDir = join(__dirname, '../events')
    loadEvents(eventDir, client)
}