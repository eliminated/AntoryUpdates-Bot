const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'tempmute',
    category: 'Moderation',
    description: 'Mutes a user for a certain amount of time',
    usage: 'tempmute <user> <time> <reason>',
    run: async (client, msg, args) => {
        if(!msg.member.permissions.has('KICK_MEMBERS')) return msg.channel.send('You do not have permission to use this command!');
        if(!args[0]){
            let err = new MessageEmbed().setColor('#ff0000').setDescription('Please provide a user to mute!');
            return msg.reply({
                embeds: [err],
                allowedMentions: {
                    repliedUser: false,
                },
            });
        }
        if(!args[1]){
            let err = new MessageEmbed().setColor('#ff0000').setDescription('Please provide a time to mute in seconds!');
            return msg.reply({
                embeds: [err],
                allowedMentions: {
                    repliedUser: false,
                },
            });
        }
        let user = msg.mentions.members.first();
        let time = args[1];
        let reason = args.slice(2).join(' ');
        if(!reason) reason = 'No reason provided';
        if(!user) return msg.channel.send('Please provide a valid user!');
        if(!time) return msg.channel.send('Please provide a valid time!');
        if(!user.roles.cache.has('996033275409735710')) {
            msg.channel.send(`${user} has been muted for ${time} minutes for the reason: ${reason}`);
            user.roles.add('962606942356926464');
            user.roles.remove('865477356654952491').then(() => {
                // in seconds
                setTimeout(() => {
                    user.roles.add('865477356654952491');
                    user.roles.remove('962606942356926464');
                }, time * 60000);
            });
            let modlog = client.channels.cache.get('865479181742505984');
            let muteEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setDescription(`User: ${user}\nAction: Mute\nReason: ${reason}\nTime: ${time} minutes`)
                .setTimestamp()
                .setFooter({text: `Muted by the Admins`, icon_url: msg.author.displayAvatarURL()});
            modlog.send({embeds: [muteEmbed]});
        } else {
            msg.channel.send(`${user} is already muted!`);
        }
    }
    
}