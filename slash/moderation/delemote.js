const { Permissions } = require('discord.js');

module.exports = {
    name: 'deleteemote',
    description: 'Delete a custom emote from the server.',
    options: [
        {
            name: 'emote',
            description: 'The emote to delete.',
            type: 3, // String type
            required: true,
        },
    ],
    run: async (client, interaction) => {
        // Check if the user has permission to manage emojis
        if (!interaction.member.permissions.has('CREATE_EXPRESSIONS')) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        // Get the emote name
        const emoteName = interaction.options.getString('emote');

        // Find the emote by name
        const emote = interaction.guild.emojis.cache.find(emoji => emoji.name === emoteName);

        if (!emote) {
            return interaction.reply({ content: `Emote ${emoteName} not found.`, ephemeral: true });
        }

        try {
            // Delete the emote
            await emote.delete();

            interaction.reply({ content: `Emote ${emote} deleted successfully.`, ephemeral: true });
        } catch (error) {
            console.error('Error deleting emote:', error);
            interaction.reply({ content: 'An error occurred while deleting the emote.', ephemeral: true });
        }
    },
};
