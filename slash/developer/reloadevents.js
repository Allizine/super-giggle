const { developers } = require('../../config.js');
const fs = require('fs');

module.exports = {
    name: 'reload-events',
    description: 'Reloads all events',
    run: async (client, interaction) => {
        // Check if the user invoking the command is permitted
        const userId = interaction.user.id;
        if (!developers.hasOwnProperty(userId)) {
            console.log(`User with ID ${userId} attempted to reload events but does not have permission.`);
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        try {
            // Reload all event files
            const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
            for (const file of eventFiles) {
                delete require.cache[require.resolve(`../../events/${file}`)];
                const event = require(`../../events/${file}`);
                client.removeAllListeners(event.name); // Remove existing listeners for this event
                client.on(event.name, event.run.bind(null, client)); // Add new listener for this event
            }
            console.log('Events reloaded successfully.');
            interaction.reply({ content: 'Events reloaded successfully.', ephemeral: true });
        } catch (error) {
            console.error('Error reloading events:', error);
            interaction.reply({ content: 'An error occurred while reloading events.', ephemeral: true });
        }
    },
};
