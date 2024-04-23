const { Permissions, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "lock",
    description: "Locks your current channel",
    options: [],

    run: async (client, interaction) => {
        // Check if the interaction was triggered in a guild and if the channel is available
        if (!interaction.guild || !interaction.channel) {
            return interaction.reply({ content: 'This command can only be used in a guild channel.', ephemeral: true });
        }

        const channel = interaction.channel;

        try {
            const permissionsOverwrites = [
                {
                    id: interaction.guild.id,
                    deny: Permissions.FLAGS.SEND_MESSAGES,
                },
                {
                    id: interaction.guild.id,
                    allow: Permissions.FLAGS.VIEW_CHANNEL | Permissions.FLAGS.READ_MESSAGE_HISTORY,
                },
                {
                    id: interaction.guild.id,
                    deny: Permissions.FLAGS.CREATE_PUBLIC_THREADS | Permissions.FLAGS.CREATE_PRIVATE_THREADS,
                },
            ];

            await channel.permissionOverwrites.set(permissionsOverwrites);
            await interaction.reply({ content: `${channel.toString()} has been locked.`, ephemeral: true });
        } catch (error) {
            console.error(`Error locking channel: ${error}`);
            await interaction.reply({ content: 'There was an error locking the channel.', ephemeral: true });
        }
    },
};
