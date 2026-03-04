const { SlashCommandBuilder, InteractionContextType } = require("discord.js");
const addOptions = require("./addOptions");

function buildCommands(command) {
    const slashCommand = new SlashCommandBuilder()
        .setName(command.name)
        .setDescription(command.description)
        .setDefaultMemberPermissions(command.permissions === "Aucune" ? null : command.permissions);

    if (command.context?.length) {
        slashCommand.setContexts(command.context);
    }

    if (command.options?.length > 0) {
        command.options.forEach(option => {
            // Sécurité : s'assurer que option.type existe et est une string avant de faire toLowerCase
            const type = typeof option.type === 'string' ? option.type.toLowerCase() : option.type;

            if (type === 'subcommand') {
                slashCommand.addSubcommand(sub => {
                    sub.setName(option.name).setDescription(option.description ?? 'Aucune description.');
                    if (Array.isArray(option.options) && option.options.length) {
                        addOptions(sub, option.options);
                    }
                    return sub; 
                });

            } else if (type === 'subcommandgroup') {
                slashCommand.addSubcommandGroup(group => {
                    group.setName(option.name).setDescription(option.description ?? 'Aucune description.');
                    if (Array.isArray(option.options) && option.options.length) {
                        option.options.forEach(subcommand => {
                            group.addSubcommand(sub => {
                                sub.setName(subcommand.name)
                                   .setDescription(subcommand.description ?? 'Aucune description.');
                                if (Array.isArray(subcommand.options) && subcommand.options.length) {
                                    addOptions(sub, subcommand.options);
                                }
                                return sub;
                            });
                        });
                    }
                    return group;
                });

            } else {
                // Toutes les autres options (user, string, boolean, etc.)
                addOptions(slashCommand, [option]);
            }
        });
    }

    return slashCommand.toJSON();
}

module.exports = buildCommands;