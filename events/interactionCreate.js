const { InteractionType } = require("discord.js");
const client = require("../index.js");

client.on("interactionCreate", async (interaction) => {
    if (!interaction.guild) return;
    if (interaction.user.bot) return;

    if (interaction.isCommand()) {
        const command = client.slashCommands.get(interaction.commandName);
        if (command) {
            try {
                await command.run(client, interaction);
            } catch (error) {
                console.log(error);
                await interaction.reply({
                    content: "There was an error while executing this command!",
                    ephemeral: true,
                });
            }
        }
    } else if (interaction.isMessageComponent()) {
        // Handle message component interactions here
        // For example, check custom IDs and call corresponding functions

        // Construct and send interaction response with components
        await interaction.reply({
            content: 'Select a member to ban:',
            components: [{
                type: 1, // This indicates a message component type (e.g., ActionRow)
                components: [{
                    type: 2, // This indicates a button type
                    custom_id: 'modal_button',
                    label: 'Button Label', // Label for the button
                    style: 2, // Style of the button (2 for primary, 1 for secondary, 3 for success, 4 for danger)
                    emoji: '⚠️', // Emoji for the button (optional)
                }]
            }]
        });
    }
});

