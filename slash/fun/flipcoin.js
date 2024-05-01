const { EmbedBuilder, Colors } = require("discord.js");

module.exports = {
    name: "flipcoin",
    description: "Flip a coin and get heads or tails.",
    run: async (client, interaction) => {
        // Generate a random number (0 or 1)
        const result = Math.random() < 0.5 ? "Heads" : "Tails";

        // Initialize an embed builder
        const flipEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Coin Flip")
            .setDescription(`You got: ${result}`)
            .setTimestamp();

        // Respond to the interaction with the embed
        await interaction.reply({ embeds: [flipEmbed] });
    },
};
