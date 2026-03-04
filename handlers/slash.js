const { REST, Routes } = require("discord.js")
const buildCommands = require("../functions/buildCommands")

module.exports = async (client) => {
    const commands = client.commands.map(command => {
        return buildCommands(command)
    }).filter(Boolean)

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)
    try {
        await rest.put(Routes.applicationCommands(process.env.BOT_ID), { body: commands })
        console.log(`[✅] » [Slashcommands] Successfully registered ${commands.length} commands.`)
    } catch (error) {
        console.error('Error updating application commands:', error)
        return
    }
}