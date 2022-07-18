const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'warn',
    category: 'Moderation',
    description: 'Warns a user',
    usage: 'warn <user> <reason>',
    run: async (client, msg, args) => {
        let user = msg.mentions.users.first();
        if(!user) {
            let err = new MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`Please mention a user to warn`)

            return msg.channel.send({embeds: [err]});
        }
        let reason = args.slice(1).join(' ');
        if(!reason) {
            reason = 'No reason given';
        }
        let warnEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle(`Warned ${user.tag}`)
        .setDescription(`Name: ${user.tag}\nID: ${user.id}\nReason: ${reason}\nUser Type: ${user.bot ? 'Bot' : 'Human'}\Action: Warned`)
        let modlog = msg.guild.channels.cache.find(c => c.name === 'modlog');
        if(!modlog) {
            let err = new MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`Please create a channel called modlog`)

            return msg.channel.send({embeds: [err]});
        }
        modlog.send({embeds: [warnEmbed]});
        msg.delete();
        msg.channel.send(`:white_check_mark: **successfully warned ${user.tag}**\nPlease check modlog for more info`);
    }
}