const { Client, Interaction, Collector, ApplicationCommandOptionType, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { description } = require("./help");

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */


    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value || "No reason provided";

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        if(!targetUser) {
            await interaction.editReply("That user dosen't exist in this server.");
            return;
        }

        if (targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply("You can't bane that user because they're the server owner.");
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.positions; //Heightest role of the target user
        const requestedRolePosition = interaction.member.roles.highest.position; // Highest roles of the user running the cmd
        const botRolePosition = interaction.guild.members.me.roles.highest.position; //Highest role of the bot

        if (targetUserRolePosition >= requestedRolePosition) {
            await interaction.editReply("You can't ban that user because they have the same/higher role than you");
            return;

        }

        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply("I can't ban that user because they have the same/higher role than me.")
            return;
        }

        // Ban the targetuser
        try {
            await targetUser.ban({ reason });
            await interaction.editReply(`User ${targetUser} was banned\nReason : ${reason}`);
        } catch (error) {
            console.log("There was an error when banning.")
        }
    },
    
    
    name: 'ban',
    description: 'Bans a member from this server.',
    options: [
        {
            name: 'target-user',
            description: 'The user you want to ban. ',
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason you want to ban.',
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionRequired: [PermissionFlagsBits.BanMembers],
    botpermissions: [PermissionFlagsBits.BanMembers],

    
}