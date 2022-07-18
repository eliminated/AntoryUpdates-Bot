const client = require('../../main.js');
require('dotenv').config();
const prefix = process.env.PREFIX;

client.on('messageCreate', async (message) => {
    // Detects message content
    if (message.author.bot) return;
    if (message.content.startsWith(prefix)) return;
    if (!message.guild) return;

    let badwords = [
        'fuck',
        'shit',
        'bitch',
        'damn'
    ];



    // If message content characters is less than 2
    if(message.content.length < 2) {
        message.channel.send(`${message.author} please do not send in single characters!`);
        message.delete();
    }
    if(message.content === 'hello') {
        message.reply({
            content: `Hi there, ${message.author.username}!`,
            allowedMentions: {
                repliedUser: false,
            },
        });
    }

    // Determine if bad words is in the sentences
    if(badwords.some(word => message.content.toLowerCase().includes(word))) {
        if (message.member.permissions.has('MANAGE_MESSAGES')) return;
        message.channel.send({
            content: `Please do not swear, ${message.author}`
        });
        message.delete();
            
    }

});