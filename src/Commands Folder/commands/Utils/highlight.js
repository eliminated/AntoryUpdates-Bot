const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'highlight',
    category: 'Utils',
    description: 'Highlights a message',
    usage: 'highlight <messageid>',
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
        
        let highlightChannel = msg.guild.channels.cache.find(c => c.name === 'highlights');
        if(!highlightChannel) {
            let err = new MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`Please create a channel called highlights`)

            return msg.channel.send({embeds: [err]});
        }
        
        let rndEmbedColor = Math.floor(Math.random() * 16777215).toString(16);
        let highlightmsg = new MessageEmbed()
        .setColor(rndEmbedColor)
        .setTitle(`Highlighted Message`)
        .setDescription(`*${message.content}*-*${message.author.tag}*`)

        highlightChannel.send({embeds: [highlightmsg]});
        msg.delete();
    }
    
}