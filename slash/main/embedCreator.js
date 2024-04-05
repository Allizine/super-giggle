const { SlashCommandBuilder } = require("discord.js");
const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, 
    EmbedBuilder, } = require('discord.js');
const { description } = require("./help");
module.exports = {
    name: 'embedCreator',
    description: "Creates your custom embed!",
    option: [],

    run: async (client, interaction) => {
            const modal = new ModalBuilder()
            .setTitle('Embed Creator')
            .setCustomId('modal');

        const title = new TextInputBuilder()
            .setCustomId('title')
            .setLabel('title')
            .setRequired(true)
            .setPlaceholder('Enter your embed title here.')
            .setStyle(TextInputStyle.Short);

        const description = new TextInputBuilder()
            .setCustomId('description')
            .setLabel('Description')
            .setRequired(False)
            .setPlaceholder('Enter your embed description here.')
            .setStyle(TextInputStyle.Paragraph);

        const color = new TextInputBuilder()
            .setCustomId('color')
            .setLabel('Color')
            .setRequired(False)
            .setPlaceholder('Enter your 6 digit hex code')
            .setStyle(TextInputStyle.Short);

        const image_Link = new TextInputBuilder()
             .setCustomId('image_link')
             .setLabel('Image')
             .setRequired(False)
             .setPlaceholder('Enter your embed image link here.')
             .setStyle(TextInputStyle.Short);   

        const thumbnail_Link = new TextInputBuilder()
             .setCustomId('thumbnail')
             .setLabel('Thumbnail')
             .setRequired(False)
             .setPlaceholder('Enter your embed thumbnail link here.')
             .setStyle(TextInputStyle.Short);

        const firstActionRow = new ActionRowBuilder().addComponents('title');
        const secondActionRow = new ActionRowBuilder().addComponents('description');
        const colorembed = new ActionRowBuilder().addComponents('color');
        const image = new ActionRowBuilder().addComponents('image_link');
        const thumbnail = new ActionRowBuilder().addComponents('thumbnail');

        modal.addComponents(
            firstActionRow,
            secondActionRow,
            colorembed,
            image,
            thumbnail
        )
        interaction.showModal(modal);
        interaction.reply

    }
}
    
