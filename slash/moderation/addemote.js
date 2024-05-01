const { Permissions } = require('discord.js');
const https = require('https');
const fs = require('fs');

module.exports = {
    name: 'addemote',
    description: 'Add a custom emote to the server.',
    options: [
        {
            name: 'name',
            description: 'The name of the emote.',
            type: 3, // String type
            required: true,
        },
        {
            name: 'url',
            description: 'The URL of the image to use for the emote.',
            type: 3, // String type
            required: true,
        }
    ],
    run: async (client, interaction) => {
        // Check if the user has permission to manage emojis
        if (!interaction.member.permissions.has('CREATE_EXPRESSIONS')) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }
    
        // Check if a URL is provided
        const url = interaction.options.getString('url');
        const name = interaction.options.getString('name');
    
        console.log('URL:', url);
        console.log('Name:', name);
    
        if (!url) {
            return interaction.reply({ content: 'Please provide a URL to the image.', ephemeral: true });
        }
    
        try {
            // Make an HTTP request to download the image
            https.get(url, (response) => {
                // Initialize a buffer to store the image data
                let buffer = Buffer.from([]);
                
                // Listen for data chunks and append them to the buffer
                response.on('data', (chunk) => {
                    buffer = Buffer.concat([buffer, chunk]);
                });
                
                // Once all data is received, save the image locally
                response.on('end', () => {
                    const filePath = `./${name}.png`; // Assuming the image format is PNG
                    fs.writeFileSync(filePath, buffer);
                    
                    // Create the emote
                    interaction.guild.emojis.create(filePath, name)
                        .then((emote) => {
                            interaction.reply({ content: `Emote ${emote} added successfully.`, ephemeral: true });
                        })
                        .catch((error) => {
                            console.error('Error adding emote:', error);
                            interaction.reply({ content: 'An error occurred while adding the emote.', ephemeral: true });
                        });
                });
            });
        } catch (error) {
            console.error('Error adding emote:', error);
            interaction.reply({ content: 'An error occurred while adding the emote.', ephemeral: true });
        }
    },
};






