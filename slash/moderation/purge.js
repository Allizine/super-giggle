const { Permissions } = require('discord.js');

module.exports = {
    name: 'purge',
    description: 'Delete a specified number of messages.',
    options: [
        {
            name: 'amount', // Make sure to provide the name field
            description: 'Number of messages to delete.',
            type: 4,
            required: true,
        },
    ],
    run: async (client, interaction) => {
        // Check if the user has permission to manage messages
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        // Get the amount of messages to delete from the options
        const amount = interaction.options.getInteger('amount');

        // Check if the amount is valid
        if (isNaN(amount) || amount < 1 || amount > 100) {
            return interaction.reply({ content: 'Please provide a number between 1 and 100.', ephemeral: true });
        }

        // Delete the specified number of messages
        try {
            const messages = await interaction.channel.messages.fetch({ limit: amount });
            await interaction.channel.bulkDelete(messages);
            interaction.reply({ content: `Deleted ${messages.size} messages.`, ephemeral: true });
        } catch (error) {
            console.error('Error deleting messages:', error);
            interaction.reply({ content: 'An error occurred while deleting messages.', ephemeral: true });
        }
    },
};
