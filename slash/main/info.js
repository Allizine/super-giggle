const { EmbedBuilder, Colors } = require("discord.js");
module.exports = {
    name: "info",
    description: "View rules and information of the Reaper Official Discord",
    options: [],
    run: async (client, interaction) => {

        const infoembed = new EmbedBuilder()
        .setTitle('Server Information')
        .setThumbnail('https://cdn.discordapp.com/attachments/1230961241166708827/1231308232216150086/E2BCA5AA-C636-4BC8-9737-84913863EB2E.png?ex=662558a7&is=66240727&hm=48627983284f127e022c92e12767c6b2d16bdd1185d0d007e304e3bba0e7828b&')
        .setDescription('We are dedicated to fostering a supportive and collaborative community atmosphere, imbued with a sense of healthy competition. Recognizing the challenges that content creators face in launching their endeavors, we aspire to provide a nurturing environment for their growth. We understand the inherent difficulties of starting out, and the importance of having a robust community to provide encouragement and guidance. At Reaper, we are committed to empowering every individual to realize their fullest potential. Join our community today to experience firsthand the camaraderie and opportunities that await. Together, let us embark on a journey of growth and excellence.')
        .setColor(Colors.DarkVividPink)
        .setFooter({ text: 'Reaper Team' })


        const rulesembed = new EmbedBuilder()
        .setTitle('Server Guidelines')
        .setColor(Colors.DarkVividPink)
        .addFields(
            {name: 'Saftey and Privacy', value:'* *We strictly prohibit the sharing or solicitation of personal information, including but not limited to addresses, phone numbers, email addresses, and social security numbers. Respect the privacy of others and refrain from sharing sensitive information without explicit consent. We also provide educational resources and support to help our community members navigate online safety and privacy concerns effectively. Stay informed about best practices for online security and privacy protection.*'},
            {name:'Respectfulness to Others', value:'* *Treat all community members with respect and consideration. While competitive banter is encouraged, refrain from personal attacks, harassment, or discriminatory language. Respect others boundaries and viewpoints, even in the heat of competition.  In competitive interactions, ensure that all parties involved are comfortable with the level of intensity and language used. If someone expresses discomfort or asks you to tone down your language, please respect their wishes.*'},
            {name:'Hate Speech and Bullying', value:'* *Hate speech, including but not limited to discriminatory language or expressions that promote violence, bigotry, or intolerance towards individuals or groups based on race, ethnicity, nationality, religion, gender identity, sexual orientation, disability, or any other characteristic, is strictly prohibited. Bullying of any form, including verbal, physical, emotional, or cyberbullying, is unacceptable. We define bullying as any behavior intended to intimidate, harm, or belittle others. This includes but is not limited to name-calling, spreading rumors, exclusion, threats, or any other form of targeted harassment.*'},
            {name:'Spam and Self Promotion', value:'* *Refrain from repetitive posting or flooding channels with irrelevant content, emojis, or symbols.  Limit promotional content to relevant channels and provide context when sharing personal projects or links.*'},
            {name:'Copyright and Intellectual Property', value:'* *We expect all members to acknowledge and uphold the rights of content creators, refraining from unauthorized reproduction, distribution, or sharing of copyrighted material without proper authorization. Safeguard the intellectual property rights of fellow community members, respecting their ownership and control over original creations while refraining from unauthorized use or modification.*'},
            {name:'Proper Channel Usage', value:'* *Each channel is designated for specific topics or purposes. Please respect the intended use of each channel and refrain from discussing unrelated topics or posting irrelevant content.*'},
            {name:'Enforcement', value:'* *The moderation team has the authority to enforce community guidelines and take appropriate action in response to violations. This includes warning members, muting, kicking, or banning individuals who repeatedly disregard the rules.*'},
            {name: 'Appeal Process', value:'* *Members who believe they have been unfairly penalized may appeal the decision to the moderation team. Appeals should be submitted through the designated channel or platform, providing context and any relevant evidence to support their case.*'},
            {name:'Suggestions and Feedback', value:'* *We encourage open and constructive communication among our members. If you have ideas, suggestions, or feedback regarding any aspect of the server, feel free to share them in the designated channels or through direct messages to the moderation team.*'},
            {name:'Creator Program', value:'* *Please locate Creator Program in our discord or vist our website under Creator Program for information regarding that.*'},
        )
        

        return interaction.reply({ embeds: [infoembed, rulesembed ]}).catch(err => {})
        
      
    },
    };