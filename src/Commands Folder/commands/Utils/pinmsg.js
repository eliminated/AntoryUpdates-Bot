const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'pinmsg',
    category: 'Utils',
    description: 'Pins a message',
    usage: 'pinmsg <messageid>',
    run: async (client, msg, args) => {
        if(!msg.member.permissions.has('MANAGE_MESSAGES')) return msg.channel.send(`:x: **You do not have permission to use this command.**`);
        let id = args[0];
        if(!id) {
            let err = new MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`Please provide a message id`)

            return msg.channel.send({embeds: [err]});
        }
        let message = await msg.channel.messages.fetch(id);
        if(!message) {
            let err = new MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`Message not found`)

            return msg.channel.send({embeds: [err]});
            
        }
        // pin message then delete the pin message log
        try{
            await message.pin();
            await msg.delete();
        }catch(e) {
            await msg.channel.send('Something went wrong with our bot, please try again later');
            console.error(e);
        }
    }
}