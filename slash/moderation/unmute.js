const { Permissions, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'unmute',
    description: 'Unmute a member.',
    options: [
        {
            name: 'member',
            description: 'The member to unmute.',
            type: 6, // User type
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason for the unmute.',
            type: 3, // String type
            required: false,
        },
    ],
    run: async (client, interaction) => {
        // Check if the user has permission to manage roles
        if (!interaction.member.permissions.has('MANAGE_ROLES')) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        // Get the mentioned member
        const member = interaction.options.getMember('member');
        if (!member) {
            return interaction.reply({ content: 'Please mention the member to unmute.', ephemeral: true });
        }

        // Get the reason for unmuting
        const reason = interaction.options.getString('reason') || 'No reason provided';

        try {
            // Find the mute role
            let muteRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');
            if (!muteRole) {
                return interaction.reply({ content: 'There is no Muted role to remove from this member.', ephemeral: true });
            }

            // Check if the member has the mute role
            if (!member.roles.cache.has(muteRole.id)) {
                return interaction.reply({ content: `${member.user.tag} is not muted.`, ephemeral: true });
            }

            // Remove the mute role from the member
            await member.roles.remove(muteRole);

            interaction.reply({ content: `${member.user.tag} has been unmuted. Reason: ${reason}`, ephemeral: true });
        } catch (error) {
            console.error('Error unmuting member:', error);
            interaction.reply({ content: 'An error occurred while unmuting the member.', ephemeral: true });
        }
    },
};



