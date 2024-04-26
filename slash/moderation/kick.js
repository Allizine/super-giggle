const { Permissions, TextChannel, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "kick",
    description: "Kick a user from the server.",
    options: [
        {
            name: 'user',
            description: 'The user to kick.',
            type: 6,
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason for the kick.',
            type: 3,
            required: true,
        }
    ],
    run: async (client, interaction) => {
        const { guild, member, options } = interaction;
        const userToKickOption = options.getMember('user');
        if (!userToKickOption) {
            return interaction.reply({ content: "User not found.", ephemeral: true });
        }
        const userToKick = userToKickOption.user;

        const reason = options.getString('reason') || 'No reason provided';

        if (!member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ content: "You do not have permission to use this command.", ephemeral: true });
        }

        try {
            await guild.members.kick(userToKick, { reason });

            const kickEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('User Kicked')
                .setDescription(`**${userToKick.tag}** has been kicked.`)
                .addFields(
                    { name: 'User ID:', value: userToKick.id, inline: true },
                    { name: 'Reason:', value: reason, inline: true }
                )
                .setTimestamp();

            const logChannel = guild.channels.cache.get('1224478374739836978');
            if (logChannel && logChannel instanceof TextChannel) {
                logChannel.send({ embeds: [kickEmbed.toJSON()] });
            } else {
                console.error('Error: logChannel is not a valid text channel');
            }

            interaction.reply({ content: `Successfully kicked ${userToKick.tag}.`, ephemeral: true });
        } catch (error) {
            console.error('Error kicking member:', error);
            interaction.reply({ content: "An error occurred while trying to kick the member.", ephemeral: true });
        }
    },
};

