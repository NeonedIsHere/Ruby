const { Events, ActivityType, PresenceUpdateStatus } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`(WK-${process.pid}) [✅] » [Ready] ${client.user.username} est connecté`);

        client.user.setPresence({
            activities: [
                {
                    name: "Made by neonedishere | discord.gg/exia",
                    type: ActivityType.Streaming,
                    url: "https://twitch.tv/exia"
                }
            ],
            status: PresenceUpdateStatus.DoNotDisturb
        });
    }
};