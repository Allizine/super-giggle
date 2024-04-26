const { Permissions, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'mute',
    description: 'Mute a member.',
    options: [
        {
            name: 'member',
            description: 'The member to mute.',
            type: 6, // User type
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason for the mute.',
            type: 3, // String type
            required: false,
        },
        {
            name: 'duration',
            description: 'The duration of the mute. Example: "1d" for 1 day, "1w" for 1 week, "1m" for 1 month, etc.',
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
            return interaction.reply({ content: 'Please mention the member to mute.', ephemeral: true });
        }

        // Get the reason for muting
        const reason = interaction.options.getString('reason') || 'No reason provided';

        // Get the mute duration
        const duration = interaction.options.getString('duration');

        try {
            // Apply the mute role to the member
            let muteRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');
            if (!muteRole) {
                try {
                    muteRole = await interaction.guild.roles.create({
                        name: 'Muted',
                        permissions: []
                    });

                    // Iterate over each channel and update permissions for the mute role
                    interaction.guild.channels.cache.forEach(async (channel, id) => {
                        await channel.permissionOverwrites.create(muteRole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            CONNECT: false
                        });
                    });
                } catch (error) {
                    console.error('Error creating mute role:', error);
                    interaction.reply({ content: 'An error occurred while creating the mute role.', ephemeral: true });
                    return;
                }
            }

            // Proceed with muting the member by assigning the mute role
            await member.roles.add(muteRole);

            interaction.reply({ content: `${member.user.tag} has been muted. Reason: ${reason}`, ephemeral: true });
        } catch (error) {
            console.error('Error muting member:', error);
            interaction.reply({ content: 'An error occurred while muting the member.', ephemeral: true });
        }
    },
};


