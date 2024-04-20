const { TextChannel, NewsChannel } = require('discord.js');

module.exports = {
    name: 'say',
    description: 'Say something in a specific channel.',
    options: [
        {
            name: 'channel',
            description: 'The channel to send the message in.',
            type: 7, // Use type 7 for CHANNEL
            required: true,
        },
        {
            name: 'message',
            description: 'The message to send.',
            type: 3, // Use type 3 for STRING
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const { member, guild, options } = interaction;

        const channelOption = options._hoistedOptions.find(option => option.name === 'channel');
        const channel = guild.channels.cache.get(channelOption.value);
        const message = options.getString('message');

       if  (!member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        try {
            if (!channel || !(channel instanceof TextChannel) && !(channel instanceof NewsChannel)) {
                return interaction.reply({ content: 'Please specify a valid text channel.', ephemeral: true });
            }

            await channel.send(message);
            interaction.reply({ content: 'Message has been sent.', ephemeral: true });
        } catch (error) {
            console.error('Error sending message:', error);
            interaction.reply({ content: 'An error occurred while sending the message.', ephemeral: true });
        }
    },
};








