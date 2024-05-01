const { EmbedBuilder, Colors } = require('discord.js');

module.exports = {
    name: 'grantrole',
    description: 'Grant a role to a member.',
    options: [
        {
            name: 'member',
            description: 'The member to grant the role to.',
            type: 6, // User type
            required: true,
        },
        {
            name: 'role',
            description: 'The role to grant.',
            type: 8, // Role type
            required: true,
        },
    ],
    run: async (client, interaction) => {
        // Check if the user has permission to manage roles
        if (!interaction.member.permissions.has('MANAGE_ROLES')) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        // Get the mentioned member and role
        const member = interaction.options.getMember('member');
        const role = interaction.options.getRole('role');

        if (!member || !role) {
            return interaction.reply({ content: 'Please mention the member and provide a valid role.', ephemeral: true });
        }

        // Add the role to the member
        await member.roles.add(role);

        // Create an embed to confirm role addition
        const embed = new EmbedBuilder()
            .setDescription(`Role ${role.name} granted to ${member.user.tag}`)
            .setColor(Colors.Green)
            .setTimestamp();

        // Reply with the embed
        interaction.reply({ embeds: [embed] }).catch(console.error);
    },
};
