const { EmbedBuilder, Colors } = require('discord.js');

module.exports = {
    name: 'botcount',
    description: 'Lists the number of bots in the server.',
    options: [],
    run: async (client, interaction) => {
        // Filter out only the bot members
        const botCount = interaction.guild.members.cache.filter(member => member.user.bot).size;

        // Create an embed to display the bot count
        const embed = new EmbedBuilder()
            .setDescription(`There are ${botCount} bots in the server.`)
            .setColor(Colors.Blue)
            .setTimestamp();

        // Reply with the embed
        interaction.reply({ embeds: [embed] }).catch(console.error);
    },
};
