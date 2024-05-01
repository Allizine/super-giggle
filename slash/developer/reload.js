const { developers } = require('../../config.js'); // Assuming permitted user IDs are stored in a config file
const fs = require('fs');
console.log('Path:', require.resolve('../../config.js'));
console.log('Config:', require('../../config.js'));
module.exports = {
    name: 'reload',
    description: 'Reloads all commands',
    run: async (client, interaction) => {
        // Check if the user invoking the command is permitted
        // Check if the user invoking the command is permitted
const userId = interaction.user.id;
if (!developers.hasOwnProperty(userId)) {
    console.log(`User with ID ${userId} attempted to reload commands but does not have permission.`);
    return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
}


        try {
            // Reload all command files
            const commandFiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                delete require.cache[require.resolve(`./${file}`)];
                const command = require(`./${file}`);
                client.commands.set(command.name, command);
            }
            console.log('Commands reloaded successfully.');
            interaction.reply({ content: 'Commands reloaded successfully.', ephemeral: true });
        } catch (error) {
            console.error('Error reloading commands:', error);
            interaction.reply({ content: 'An error occurred while reloading commands.', ephemeral: true });
        }
    },
};

