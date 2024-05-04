const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'rps',
    description: 'Play rock, paper, scissors with the bot.',
    options: [{
        name: 'choice',
        type: 3, // 3 represents STRING type
        description: 'Your choice: rock, paper, or scissors',
        required: true
    }],
    run: async (client, interaction) => {
        // Define the options for the game
        const options = ['rock', 'paper', 'scissors'];
        
        // Get the user's choice
        const userChoice = interaction.options.getString('choice').toLowerCase();

        // Validate the user's choice
        if (!options.includes(userChoice)) {
            return interaction.reply({ content: 'Invalid choice. Please choose rock, paper, or scissors.', ephemeral: true });
        }

        // Randomly select the bot's choice
        const botChoice = options[Math.floor(Math.random() * options.length)];

        // Determine the winner
        let result;
        if (userChoice === botChoice) {
            result = 'It\'s a tie!';
        } else if ((userChoice === 'rock' && botChoice === 'scissors') ||
                   (userChoice === 'paper' && botChoice === 'rock') ||
                   (userChoice === 'scissors' && botChoice === 'paper')) {
            result = 'You win!';
        } else {
            result = 'I win!';
        }

        // Send the result
        await interaction.reply({ content: `You chose ${userChoice}, I chose ${botChoice}. ${result}` });
    },
};
