const { EmbedBuilder, Colors } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
    name: "help",
    description: "View bot slash commands.",
    options: [],
    run: async (client, interaction) => {
        // Initialize an embed builder
        const helpEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Bot Slash Commands')
            .setTimestamp();

        // Get the path to the slash directory
        const slashDirectory = path.join(__dirname, '..');

        try {
            // Read the content of the slash directory
            const commandFolders = fs.readdirSync(slashDirectory);

            // Iterate over each folder in the slash directory
            for (const folder of commandFolders) {
                const folderPath = path.join(slashDirectory, folder);
                
                // Read the content of each folder
                const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

                // Add category title
                helpEmbed.addFields({ name: `**${folder.charAt(0).toUpperCase() + folder.slice(1)}**`, value: '\u200B' });

                // Iterate over each command file in the folder
                for (const file of commandFiles) {
                    const commandFilePath = path.join(folderPath, file);
                    
                    // Require the command file
                    const command = require(commandFilePath);
                    
                    // Add command information to the embed
                    helpEmbed.addFields(
                        { name: command.name, value: command.description }
                    );
                }
            }

            // Check if the interaction happened in a guild
            if (interaction.guild) {
                // If in a guild, reply in the channel
                interaction.reply({ embeds: [helpEmbed] });
            } else {
                // If in DMs, send the help message to the user's DM
                const user = await client.users.fetch(interaction.user.id);
                user.send({ embeds: [helpEmbed] }).catch(console.error);
            }
        } catch (error) {
            console.error("Error reading slash directory:", error);
        }
    },
};


