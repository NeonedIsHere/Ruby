const { ContainerBuilder } = require('discord.js')

module.exports = {
    name: 'bvn',
    description: 'dis bienvenue a une personne',
    permissions: 'Aucune',
    context: [InteractionContextType.Guild],
    options: [],

    async execute(interaction, client) {
        const embedBvn = new ContainerBuilder()
    }
}