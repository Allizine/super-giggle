const { Permissions, ActionRowBuilder, ButtonBuilder, TextChannel } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ban",
    description: "Ban a user from the server.",
    options: [
        {
            name: 'user',
            description: 'The user to ban.',
            type: 6,
            required: true,
            value: '1' // Adding value '1' for user option
        },
        {
            name: 'reason',
            description: 'The reason for the ban.',
            type: 3,
            required: true,
            value: '2' // Adding value '2' for reason option
        },
        {
            name: 'duration',
            description: 'The duration of the ban. Example: "1d" for 1 day, "1w" for 1 week, "1m" for 1 month, etc.',
            type: 3,
            required: false
        }
    ],
    run: async (client, interaction) => {
        const { guild, member, options } = interaction;
        const userToBanOption = options.getMember('user'); 
        if (!userToBanOption) {
            return interaction.reply({ content: "User not found.", ephemeral: true });
        }
        const userToBan = userToBanOption.user;

        const reason = options.getString('reason') || 'No reason provided';
        const duration = options.getString('duration');

        if (!member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ content: "You do not have permission to use this command.", ephemeral: true });
        }

        try {
            // Calculate ban duration
            let banDuration = null;
            let banDurationString = 'Permanent';
            if (duration) {
                // Parse the duration string and calculate the milliseconds
                const durationRegex = /^(\d+)([smhdw])$/;
                const match = duration.match(durationRegex);
                if (match) {
                    const [, amount, unit] = match;
                    let multiplier = 1;
                    switch (unit) {
                        case 's': multiplier = 1000; break; // seconds
                        case 'm': multiplier = 1000 * 60; break; // minutes
                        case 'h': multiplier = 1000 * 60 * 60; break; // hours
                        case 'd': multiplier = 1000 * 60 * 60 * 24; break; // days
                        case 'w': multiplier = 1000 * 60 * 60 * 24 * 7; break; // weeks
                    }
                    banDuration = amount * multiplier;
                    banDurationString = `${amount}${unit}`;
                }
            }

            const bannedMember = await guild.members.ban(userToBan, { reason, days: 7 });

            const banEmbed = new EmbedBuilder()
                .setTitle('User Banned')
                .setColor('#ff0000') 
                .setDescription(`**${userToBan.tag}** has been banned.`)
                .addFields(
                    { name: 'User ID:', value: userToBan.id, inline: true },
                    { name: 'Reason:', value: reason, inline: false },
                    { name: 'Duration:', value: banDurationString, inline: true }
                )
                .setThumbnail(userToBan.displayAvatarURL({ dynamic: true }))
                .setTimestamp();

            const logChannel = guild.channels.cache.get('1224478374739836978');
            if (logChannel && logChannel instanceof TextChannel) {
                // `logChannel` is defined and is a TextChannel
                logChannel.send({ embeds: [banEmbed] });
            } else {
                // `logChannel` is not defined or is not a TextChannel
                // Handle the error or log a message
                console.error('Error: logChannel is not a valid text channel');
            }

            interaction.reply({ content: `Successfully banned ${userToBan.tag} for: ${reason}`, ephemeral: true });

            // If ban duration is set, schedule an unban after the specified duration
            if (banDuration) {
                setTimeout(async () => {
                    await guild.members.unban(userToBan);
                    
                    // Create an embed for the unban action
                    const unbanEmbed = new EmbedBuilder()
                        .setTitle('User Unbanned')
                        .setColor('#00ff00') 
                        .setDescription(`**${userToBan.tag}** has been unbanned after ${banDurationString}.`);

                    // Send the unban embed to the ban log channel
                    if (logChannel && logChannel instanceof TextChannel) {
                        logChannel.send({ embeds: [unbanEmbed] });
                    } else {
                        console.error('Error: logChannel is not a valid text channel');
                    }
                }, banDuration);
            }
        } catch (error) {
            console.error('Error banning member:', error);
            interaction.reply({ content: "An error occurred while trying to ban the member.", ephemeral: true });
        }
    },
};
