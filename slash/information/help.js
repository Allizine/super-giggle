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
            .setColor(Colors.Yellow)
            .setThumbnail('https://cdn.discordapp.com/attachments/1230961241166708827/1231308232216150086/E2BCA5AA-C636-4BC8-9737-84913863EB2E.png?ex=662558a7&is=66240727&hm=48627983284f127e022c92e12767c6b2d16bdd1185d0d007e304e3bba0e7828b&')
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

                // Initialize an array to store command descriptions
                const commandDescriptions = [];
                
                // Iterate over each command file in the folder
                for (const file of commandFiles) {
                    const commandFilePath = path.join(folderPath, file);
                    
                    // Require the command file
                    const command = require(commandFilePath);
                    
                    // Add command information to the array
                    if (command && command.name && command.description) {
                        commandDescriptions.push(`${command.name} - ${command.description}`);
                    }
                }

                // Add category title and command descriptions to the embed
                if (commandDescriptions.length > 0) {
                    helpEmbed.addFields(
                        { name: `**${folder.charAt(0).toUpperCase() + folder.slice(1)}**`, value: commandDescriptions.join("\n") }
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


