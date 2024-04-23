const { Permissions } = require('discord.js');

module.exports = {
    name: 'unlock',
    description: 'Unlocks the current channel.',
    options: [],
    
    run: async (client, interaction) => {
        // Check if the user has permission to manage channels
        if (!interaction.member.permissions.has(MANAGE_CHANNELS)) {
            return interaction.reply({ content: 'You do not have permission to lock channels.', ephemeral: true });
        }

        // Get the current channel
        const channel = interaction.channel;

        // Modify channel permissions to disallow sending messages for @everyone role
        await channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
            SEND_MESSAGES: true
        });

        // Send a confirmation message
        await interaction.reply({ content: `${channel.toString()} has been unlocked.`, ephemeral: true });
    },
};