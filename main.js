// Bot hosting
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`));

// Discord.js

const Discord = require('discord.js');
const { Client, Intents, MessageEmbed, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
});
const { token, prefix } = require('./configs/config.json');

module.exports = client;

client.commands = new Collection();
client.aliases = new Collection();
client.categories = readdirSync('./src/Commands Folder/');

// Load handlers
["command", "event"].forEach(handler => {
    require(`./src/handlers/${handler}`)(client);
});


client.login(token);