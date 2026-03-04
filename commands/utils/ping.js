const { 
    InteractionContextType, 
    ContainerBuilder, 
    TextDisplayBuilder, 
    SeparatorBuilder,
    MessageFlags
} = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'Affiche la latence du bot',
    context: [InteractionContextType.Guild],
    options: [],

    async execute(interaction, client) {

        const response = await interaction.reply({
            withResponse: true,
            flags: MessageFlags.IsComponentsV2,
            components: [
                new ContainerBuilder()
                    .addTextDisplayComponents(
                        new TextDisplayBuilder()
                            .setContent('🏓 Calcul de la latence...')
                    )
            ]
        })

        const message = response.resource.message

        const messageLatency = message.createdTimestamp - interaction.createdTimestamp
        const apiLatency = client.ws.ping

        let status = '🟢 Excellente'
        if (apiLatency > 200) status = '🟡 Moyenne'
        if (apiLatency > 400) status = '🔴 Mauvaise'

        const container = new ContainerBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder()
                    .setContent('## 🏓 Pong !')
            )
            .addSeparatorComponents(
                new SeparatorBuilder()
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder()
                    .setContent(
`📡 **Latence API :** \`${apiLatency}ms\`
⏱ **Latence Message :** \`${messageLatency}ms\`
📊 **Statut :** ${status}`
                    )
            )

        await interaction.editReply({
            components: [container]
        })
    }
}