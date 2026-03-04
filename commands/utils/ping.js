const { 
    InteractionContextType, 
    ContainerBuilder, 
    TextDisplayBuilder, 
    MessageFlags 
} = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'Affiche la latence du bot',
    permissions: 'Aucune',
    context: [InteractionContextType.Guild],
    options: [],

    async execute(interaction, client) {

        const embedPing = new ContainerBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder()
                    .setContent(`🏓 Pong ! Latence : ${client.ws.ping}ms`)
            )

        await interaction.reply({
            components: [embedPing],
            flags: MessageFlags.IsComponentsV2
        })
    }
}