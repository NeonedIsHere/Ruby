const { 
    InteractionContextType,
    ContainerBuilder,
    TextDisplayBuilder,
    SeparatorBuilder,
    MessageFlags
} = require('discord.js')

module.exports = {
    name: 'botinfo',
    description: 'Voir les informations du bot',
    permissions: 'Aucune',
    context: [InteractionContextType.Guild],
    options: [],

    async execute(interaction, client) {

        const uptime = process.uptime()
        const days = Math.floor(uptime / 86400)
        const hours = Math.floor(uptime / 3600) % 24
        const minutes = Math.floor(uptime / 60) % 60
        const seconds = Math.floor(uptime) % 60

        const formattedUptime = `${days}j ${hours}h ${minutes}m ${seconds}s`

        const container = new ContainerBuilder()
            .setAccentColor(0x5865F2)
            .addTextDisplayComponents(
                new TextDisplayBuilder()
                    .setContent(`## ${client.user.username}`)
            )
            .addSeparatorComponents(new SeparatorBuilder())
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
` **ID :** \`${client.user.id}\`
 **Création :** <t:${Math.floor(client.user.createdTimestamp / 1000)}:F>
 **En ligne depuis :** \`${formattedUptime}\`

 **Serveurs :** \`${client.guilds.cache.size}\`
 **Utilisateurs :** \`${client.users.cache.size}\`
 **Salons :** \`${client.channels.cache.size}\`

 **Mémoire :** \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`
 **Node.js :** \`${process.version}\`
 **Version :** \`1.0.0\``
                )
            )

        await interaction.reply({
            flags: MessageFlags.IsComponentsV2,
            components: [container]
        })
    }
}