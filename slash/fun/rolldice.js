const { EmbedBuilder, Colors } = require("discord.js");

module.exports = {
    name: "rolldice",
    description: "Roll a dice and get a random number.",
    run: async (client, interaction) => {
        // Generate a random number between 1 and 6 (inclusive) for a standard six-sided dice
        const result = Math.floor(Math.random() * 6) + 1;

        // Initialize an embed builder
        const rollEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Dice Roll")
            .setDescription(`You rolled: ${result}`)
            .setTimestamp();

        // Respond to the interaction with the embed
        await interaction.reply({ embeds: [rollEmbed] });
    },
};
