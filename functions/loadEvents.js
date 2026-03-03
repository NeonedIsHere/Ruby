const fs = require('fs')
const path = require('path')
const logTitle = require('./logTitle')

function loadEvents(dir, client) {
    logTitle("Chargement des events", false)
    const files = fs.readdirSync(dir)

    for (const file of files) {
        const fullPath = path.join(dir, file)
        const stat = fs.statSync(fullPath)

        if (stat.isDirectory()) {
            loadEvent(fullPath, client)
        } else if (file.endsWith(".js")) {
            const event = require(fullPath)

            if (!event.name) {
                console.error(`(WK-${process.pid}) [❌] » [Events] Event ${fullPath} does not have a name property, Skipping...`)
                continue
            }

            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client))
            } else {
                client.on(event.name, (...args) => event.execute(...args, client))
            }

            client.events.set(event.name, event)
            console.log(`├── (WK-${process.pid}) [📡] » [Events] chargée avec succès: ${event.name} depuis ${file}`)
        }
    }
}

module.exports = loadEvents