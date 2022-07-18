const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'announce',
    category: 'Utils',
    description: 'Announces a message to the server',
    usage: 'announce <message>',
    run: async (client, msg, args) => {
        if(!msg.member.permissions.has('MANAGE_GUILD')) return msg.channel.send('You do not have permission to use this command!');
        if(!args[0]) return msg.channel.send('Please provide chat message to announce!');
        // Example valid channel name: '#general'
        const channel = msg.mentions.channels.first() || msg.guild.channels.cache.find(ch => ch.name === args[0]);
        if(!channel) return msg.channel.send('Please provide a valid channel name!');
        let msgs = args.slice(1).join(' ');
        if(!msgs) return msg.channel.send('Please provide a message to announce!');
        let rndEmbedColor = Math.floor(Math.random() * 16777215).toString(16);
        const embed = new MessageEmbed()
            .setColor(rndEmbedColor)
            .setTitle('Announcement')
            .setDescription(msgs)
            .setTimestamp()
            .setFooter({text: `Announced by the Admins`, icon_url: msg.author.displayAvatarURL()});
        channel.send({
            content: '@everyone , we have a new announcement!',
            embeds: [embed]
        }).then(() => {
            console.log("Used embed color: " + rndEmbedColor);
        });
        msg.delete();
    }
}