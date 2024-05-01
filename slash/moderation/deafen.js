const { Permissions } = require('discord.js');

module.exports = {
    name: 'deafen',
    description: 'Deafen or undeafen a member.',
    options: [
        {
            name: 'member',
            description: 'The member to deafen or undeafen.',
            type: 6, // User type
            required: true,
        },
        {
            name: 'action',
            description: 'The action to perform: "deafen" or "undeafen".',
            type: 3, // String type
            required: true,
            choices: [
                { name: 'Deafen', value: 'deafen' },
                { name: 'Undeafen', value: 'undeafen' }
            ]
        }
    ],
    run: async (client, interaction) => {
        // Check if the user has permission to deafen members
        if (!interaction.member.permissions.has('DEAFEN_MEMBERS')) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        // Get the mentioned member
        const member = interaction.options.getMember('member');
        if (!member) {
            return interaction.reply({ content: 'Please mention the member to deafen or undeafen.', ephemeral: true });
        }

        // Get the action to perform: deafen or undeafen
        const action = interaction.options.getString('action');

        try {
            if (action === 'deafen') {
                // Deafen the member
                await member.voice.setDeaf(true);
                interaction.reply({ content: `${member.user.tag} has been deafened.`, ephemeral: true });
            } else if (action === 'undeafen') {
                // Undeafen the member
                await member.voice.setDeaf(false);
                interaction.reply({ content: `${member.user.tag} has been undeafened.`, ephemeral: true });
            } else {
                interaction.reply({ content: 'Invalid action provided. Please provide "deafen" or "undeafen".', ephemeral: true });
            }
        } catch (error) {
            console.error('Error modifying member deafen status:', error);
            interaction.reply({ content: 'An error occurred while modifying the member deafen status.', ephemeral: true });
        }
    },
};
