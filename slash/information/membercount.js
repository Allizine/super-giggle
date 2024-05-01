const { EmbedBuilder, Colors } = require('discord.js');

module.exports = {
    name: 'membercount',
    description: 'Lists the number of members in the server.',
    options: [],
    run: async (client, interaction) => {
        // Get the member count of the server
        const memberCount = interaction.guild.memberCount;

        // Create an embed to display the member count
        const embed = new EmbedBuilder()
            .setDescription(`The server currently has ${memberCount} members.`)
            .setColor(Colors.Blue)
            .setTimestamp();

        // Reply with the embed
        interaction.reply({ embeds: [embed] }).catch(console.error);
    },
};
