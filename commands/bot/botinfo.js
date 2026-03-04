const { InteractionContextType } = require('discord.js')

module.exports = {
    name: 'botinfo',
    description: 'Voir les informations du bot',
    permissions: 'Aucune',
    context: [InteractionContextType.Guild],
    options: [],

    async execute(interaction, client) {
        
    }
}