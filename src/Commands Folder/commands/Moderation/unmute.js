const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unmute',
    category: 'Moderation',
    description: 'Unmutes a user',
    usage: 'unmute <user>',
    run: async (client, msg, args) => {
        let memberRoleID = '865477356654952491';
        let mutedRoleID = '962606942356926464';

        if(!msg.member.permissions.has('KICK_MEMBERS')) return msg.channel.send('You do not have permission to use this command!');
        if(!args[0]){
            let err = new MessageEmbed().setColor('#ff0000').setDescription('Please provide a user to unmute!');
            return msg.reply({
                embeds: [err],
                allowedMentions: {
                    repliedUser: false,
                },
            });
        }
        let user = msg.mentions.members.first();
        if(!user) return msg.channel.send('Please provide a valid user!');
        if(!user.roles.cache.has(mutedRoleID)) {
            msg.channel.send(`${user} is not muted!`);
        } else {
            user.roles.remove(mutedRoleID);
            user.roles.add(memberRoleID);
            msg.channel.send(`${user} has been unmuted!`);

            let modlog = client.channels.cache.get('865479181742505984');
            let muteEmbed = new MessageEmbed()
                .setColor('#ff0000')
                .setDescription(`User: ${user}\nAction: Unmute\nReason: Unmute`)
                .setTimestamp()
                .setFooter({text: `Unmuted by the Admins`, icon_url: msg.author.displayAvatarURL()});
            modlog.send({embeds: [muteEmbed]});
        }
    }
}