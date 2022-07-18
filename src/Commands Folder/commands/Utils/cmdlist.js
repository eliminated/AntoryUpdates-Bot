const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
    name: 'cmdlist',
    category: 'Utils',
    description: 'Lists all commands',
    usage: 'cmdlist',
    run: async (client, msg, args) => {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Command List')
            .setDescription('Here is a list of all commands!')
            .setTimestamp()
            .setFooter({text: `Requested by ${msg.author.username}`, icon_url: msg.author.displayAvatarURL()});
        const cmdName = client.commands.map(cmd => cmd.name);   
        const cmdDesc = client.commands.map(cmd => cmd.description);

        for(let i = 0; i < cmdName.length; i++) {
            embed.addField(cmdName[i], cmdDesc[i]);
        }

        msg.channel.send({
            embeds: [embed]
        });
    }
}