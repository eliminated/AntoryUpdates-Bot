const client = require('../../main.js');
require('dotenv').config();
const prefix = process.env.PREFIX;
const ascii = require('ascii-table');
let table = new ascii('Loading Status');
table.setHeading('Load Type', 'Status');

client.once('ready', () => {
    table.addRow('Commands', '✅');
    table.addRow('Events', '✅');
    table.addRow('Bot', 'Ready');
    table.addRow('Prefix', `Prefix: ('${prefix}')`);
    console.log(table.toString());

    console.log('I am ready!');
});