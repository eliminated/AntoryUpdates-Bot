module.exports = {
    name: 'purgechannel',
    description: 'Purge a channel of all messages',
    usage: 'purgechannel <channel>',
    category: 'Utils',
    run: async (client, msg, args) => {
        async function clearChannel(channel, n = 0, old = false) {      // Functions to clear a channel
            let collected = await channel.messages.fetch();
            if(collected.size > 0) {
                if (old) {
                    for(let msg of collected.array()) {
                        await msg.delete();
                        n++;
                    }
                } else {
                    let deleted = await channel.bulkDelete(100, true);
                    if(deleted.size < collected.size) old = true;
                    n += deleted; 
                }

                return n + await clearChannel(channel, old);
            } else return 0;
        }
        if(!msg.member.permissions.has('MANAGE_CHANNELS')) return msg.channel.send('You do not have permission to use this command!');
        if(!args[0]) return msg.channel.send('Please provide a channel to purge!');
        let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[0]);
        if(!channel) return msg.channel.send('Please provide a valid channel!');
        if(channel.type !== 'GUILD_TEXT') return msg.channel.send('Please provide a valid text channel!');
        try{
            let n = await clearChannel(channel);
            msg.channel.send(`Purged ${n} messages!`).then(m => m.delete({timeout: 5000}));
        } catch(e) {
            msg.channel.send('An error occured while purging messages!');
            console.error(e);
        }

    }
}