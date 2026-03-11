const { InteractionContextType, EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'help',
    description: 'Voir les commandes du bot',
    context: [InteractionContextType.Guild],
    options: [],

    async execute(interaction, client) {

        const embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('Help')
            .setThumbnail(client.user.displayAvatarURL({ size: 1024 }))
            .setDescription(`
\`/help\` - Affiche les commandes du bot  
\`/ping\` - Affiche la latence du bot  
\`/botinfo\` - Affiche les informations du bot  
\`/warn\` - Met un avertissement à un utilisateur
`)
            .setTimestamp()

        await interaction.reply({ embeds: [embed] })
    }
}