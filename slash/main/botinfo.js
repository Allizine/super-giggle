const { MessageEmbed, version } = require('discord.js');

module.exports = {
    name: "statistics",
    description: "View bot statistics.",
    options: [],
    run: async (client, interaction) => {
    
        // Function to get bot statistics
        function getBotStatistics() {
            // Replace these with actual values or functions to get the data
            const runtime = calculateRuntime(); // Function to calculate bot runtime
            const lastDowntime = getLastDowntime(); // Function to get the last downtime
            const serverCount = getServerCount(); // Function to get the number of servers the bot is in
            const userCount = getUserCount(); // Function to get the number of users the bot can see

            // Construct embed
            const botembed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Bot Statistics')
                .setDescription('Here are some statistics about the bot:')
                .addFields(
                    { name: 'Runtime', value: `${runtime} seconds`, inline: true },
                    { name: 'Last Downtime', value: `${lastDowntime}`, inline: true },
                    { name: 'Version', value: `${version}`, inline: true },
                    { name: 'Server Count', value: `${serverCount}`, inline: true },
                    { name: 'User Count', value: `${userCount}`, inline: true }
                );

            return embed;
        }

        // Example usage:
        const botStatisticsEmbed = getBotStatistics();
        // Send the embed wherever you need to

        return interaction.reply({ embeds: [botStatisticsEmbed] }).catch(err => {});
    },
};
