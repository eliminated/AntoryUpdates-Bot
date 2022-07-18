const { readdirSync } = require('fs');
const ascii = require('ascii-table');
let table = new ascii('Command Status');
table.setHeading('Commands', 'Status', 'Description');

module.exports = (client) => {
    readdirSync('./src/Commands Folder/commands/').forEach(dir => {
        const commands = readdirSync(`./src/Commands Folder/commands/${dir}/`).filter(file => file.endsWith('.js'));
        for ( const file of commands) {
            let pull = require(`../Commands Folder/commands/${dir}/${file}`);
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, 'Loaded', pull.description);
        } else {
            table.addRow(file, 'Error', 'No name provided');
            continue;
        }if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });

    console.log(table.toString());
}