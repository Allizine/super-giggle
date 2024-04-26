const fs = require('fs');

// Define the IDs of the users who are allowed to use the reload command
const allowedUserIDs = ['466352710443073538', '155818891942166529'];

module.exports = {
    name: 'reload',
    description: 'Reloads a command',
    options: [
        {
            name: 'command',
            description: 'The command to reload',
            type: 3, // String type
            required: true
        }
    ],
    run: async (client, interaction) => {
        // Check if the user executing the command is allowed
        if (!allowedUserIDs.includes(interaction.user.id)) {
            return interaction.reply({ content: 'You are not allowed to use this command.', ephemeral: true });
        }

        const commandName = interaction.options.getString('command');

        // Check if the command exists
        if (!client.commands.has(commandName)) {
            return interaction.reply({ content: `The command \`${commandName}\` does not exist.`, ephemeral: true });
        }

        // Remove the command from the cache
        delete require.cache[require.resolve(`./${commandName}.js`)];

        // Reload the command
        try {
            const newCommand = require(`./${commandName}.js`);
            client.commands.set(newCommand.name, newCommand);
            interaction.reply({ content: `The command \`${commandName}\` has been reloaded.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: `There was an error while reloading the command: \`${commandName}\``, ephemeral: true });
        }
    }
};
