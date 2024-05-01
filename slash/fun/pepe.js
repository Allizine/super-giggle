const { MessageAttachment } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'pepe',
    description: 'Posts a random picture of Pepe.',
    run: async (client, interaction) => {
        try {
            // Get the path to the directory containing Pepe images
            const pepeDirectory = path.join(__dirname, 'pepe_images');

            // Read the content of the directory
            const pepeFiles = fs.readdirSync(pepeDirectory);

            // Select a random Pepe image
            const randomIndex = Math.floor(Math.random() * pepeFiles.length);
            const randomPepe = pepeFiles[randomIndex];

            // Create a message attachment with the selected Pepe image
            const attachment = new MessageAttachment(path.join(pepeDirectory, randomPepe));

            // Respond to the interaction with the Pepe image
            await interaction.reply({ files: [attachment] });
        } catch (error) {
            console.error('Error posting Pepe image:', error);
            await interaction.reply({ content: 'An error occurred while posting Pepe image.', ephemeral: true });
        }
    },
};
