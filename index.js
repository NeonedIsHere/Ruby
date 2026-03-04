const  { Client, Collection, IntentsBitField, GatewayIntentBits, Partials, AllowedMentionsTypes, MessageMentions } = require('discord.js')
const config = require('./config.json')
require('dotenv').config()

const client = new Client({ 
    intents: [
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution,
        GatewayIntentBits.DirectMessagePolls,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildExpressions,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessagePolls,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ], partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.SoundboardSound,
        Partials.ThreadMember,
        Partials.User
    ],
    allowedMentions: {
        parse: [ "roles", "users" ],
        repliedUser: false,
        roles: [],
        users: []
    },
    enforceNonce: true,
})

client.buttons = new Collection()
client.commands = new Collection()
client.events = new Collection()
client.modals = new Collection()
client.selects = new Collection()

client.config = config

require('./handlers/database.js')
require('./handlers/commands.js')(client)
require('./handlers/events.js')(client)
require('./handlers/anticrash.js')(client)
require('./handlers/components.js')(client)
require('./handlers/slash.js')(client)

client.login(process.env.TOKEN)
    .catch((err) => console.error(`Erreur lors de la connection au bot`, err.stack))