const client = require('../../main.js');
const config = require('../../configs/config.json');
const ascii = require('ascii-table');
let table = new ascii('Loading Status');
table.setHeading('Load Type', 'Status');

client.once('ready', () => {
    table.addRow('Commands', '✅');
    table.addRow('Events', '✅');
    table.addRow('Bot', 'Ready');
    table.addRow('Prefix', `Prefix: ('${config.prefix}')`);
    console.log(table.toString());

    console.log('I am ready!');
});