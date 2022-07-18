const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'purge',
    category: 'Utils',
    description: 'Purges a number of messages from a channel',
    usage: 'purge <number>',
    run: async (client, msg, args) => {
        if(!msg.member.permissions.has('MANAGE_MESSAGES')) return msg.channel.send('You do not have permission to use this command!');
        if(!args[0]) return msg.channel.send('Please provide a number of messages to purge!');
        if(isNaN(args[0])) return msg.channel.send('Please provide a number of messages to purge!');
        if(args[0] > 100) return msg.channel.send('Please provide a number of messages to purge less than 100!');
        if(args[0] < 2) return msg.channel.send('Please provide a number of messages to purge greater than 2!');
        let nummsgs = await msg.channel.messages.fetch({limit: 100});
        try{
            msg.channel.bulkDelete(args[0]).then(deletedMessages => {
                //Filtering out the messages that were not deleted
                messages = messages.filter(val => {
                    !deletedMessages.array().includes(val);
                });
                if(messages.size > 0) {
                    // Deleting messages older than 2 weeks
                    messages.deleteAll();
                }
            }).catch(err => {
                console.log(err);
            });
        } catch(e) {
            msg.channel.send('An error occured while purging messages!');
            console.error(e);
        }
    } 
        
}