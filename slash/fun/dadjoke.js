module.exports = {
    name: 'dadjoke',
    description: 'Get a random dad joke.',
    options: [],
    run: async (client, interaction) => {
        try {
            // Dynamically import node-fetch
            const fetch = await import('node-fetch');

            // Fetch a random dad joke from the API
            const response = await fetch.default('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch dad joke.');
            }

            const data = await response.json();

            // Send the dad joke as a response
            await interaction.reply({ content: data.joke });
        } catch (error) {
            console.error('Error fetching dad joke:', error);
            await interaction.reply({ content: 'Failed to fetch dad joke.', ephemeral: true });
        }
    },
};
