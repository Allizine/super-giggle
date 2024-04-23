const { Permissions, TextChannel } = require("discord.js");

module.exports = {
    name: "unban",
    description: "Unban a user from the server.",
    options: [
        {
            name: 'user',
            description: 'The user to unban.',
            type: 6,
            required: true,
            value: '1' // Adding value '1' for user option
        },
        {
            name: 'reason',
            description: 'The reason for the unban.',
            type: 3,
            required: true,
            value: '2' // Adding value '2' for reason option
        }
    ],
    run: async (client, interaction) => {
        const { guild, member, options } = interaction;
        const userToUnbanOption = options.getMember('user'); 
        if (!userToUnbanOption) {
            return interaction.reply({ content: "User not found.", ephemeral: true });
        }
        const userToUnban = userToUnbanOption.user;

        const reason = options.getString('reason') || 'No reason provided';

        if (!member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply({ content: "You do not have permission to use this command.", ephemeral: true });
        }

        try {
            const bannedUsers = await guild.bans.fetch();
            const bannedUser = bannedUsers.find(user => user.user.id === userToUnban.id);
            if (!bannedUser) {
                return interaction.reply({ content: "User is not currently banned.", ephemeral: true });
            }

            await guild.members.unban(userToUnban, { reason });

            const unbanEmbed2 = new EmbedBuilder()
                        .setTitle('User Unbanned')
                        .setColor('#00ff00') 

            const logChannel = guild.channels.cache.get('1224478374739836978');
            if (logChannel && logChannel instanceof TextChannel) {
                logChannel.send({ embeds: [unbanEmbed] });
            } else {
                console.error('Error: logChannel is not a valid text channel');
            }

            interaction.reply({ content: `Successfully unbanned ${userToUnban.tag}.`, ephemeral: true });
        } catch (error) {
            console.error('Error unbanning member:', error);
            interaction.reply({ content: "An error occurred while trying to unban the member.", ephemeral: true });
        }
    },
};
