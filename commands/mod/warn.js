const { InteractionContextType, PermissionFlagsBits, EmbedBuilder, MessageFlags, ContainerBuilder, TextDisplayBuilder, SeparatorBuilder, SeparatorSpacingSize } = require('discord.js')
const Warn = require('../../data/warn')

module.exports = {
    name: 'warn',
    description: 'Ajouter un avertissement à un utilisateur',
    contexts: [ InteractionContextType.Guild ],
    permissions: PermissionFlagsBits.ManageMessages,
    options: [
        {
            name: 'target',
            description: 'Membre à sanctionner',
            type: "user",
            required: true
        },
        {
            name: 'reason',
            description: 'Raison de l\'avertissement',
            type: "string",
            autocomplete: false,
            required: true
        }
    ],
    async execute(interaction, client) {
        const user = interaction.options.getUser('target')
        const reason = interaction.options.getString('reason')

        if (user.bot) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription('\`❌\` Vous ne pouvez pas faire ça à un bot')

            return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral })
        }

        if (user.id === interaction.user.id) {
            const embed = new EmbedBuilder()
                .setColor('#ff5500')
                .setDescription('\`❌\` Vous ne pouvez pas vous auto-sanctionner')

            return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral })
        }

        await Warn.create({
            guild: interaction.guild.id,
            author: interaction.user.id,
            target: user.id,
            reason: reason
        })

        const container = new ContainerBuilder()
            .setAccentColor([255, 128, 0])
            .addTextDisplayComponents(
                new TextDisplayBuilder()
                    .setContent(`# Nouvelle sanction reçus`)
            )
            .addSeparatorComponents(
                new SeparatorBuilder()
                    .setDivider(true)
                    .setSpacing(SeparatorSpacingSize.Large)
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder()
                    .setContent(`**Type**: \`${this.name}\``)
            )
            .addSeparatorComponents(
                new SeparatorBuilder()
                    .setDivider(true)
                    .setSpacing(SeparatorSpacingSize.Large)
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder()
                    .setContent(`**Auteur:** ${interaction.user} \`(${interaction.user.id})\``)
            )
            .addSeparatorComponents(
                new SeparatorBuilder()
                    .setDivider(true)
                    .setSpacing(SeparatorSpacingSize.Large)
            )
            .addTextDisplayComponents(
                new TextDisplayBuilder()
                    .setContent(`**Raison:** \`${reason}\``)
            )
            .addSeparatorComponents(
                new SeparatorBuilder()
                    .setDivider(true)
                    .setSpacing(SeparatorSpacingSize.Large)
            )

            try {
                user.send({ components: [container], flags: MessageFlags.IsComponentsV2 })
            } catch (error) {}

        const embed = new EmbedBuilder()
            .setColor("#00FF00")
            .setDescription(`${user} à été warn pour: \`${reason}\``)

        return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral })
    }
}