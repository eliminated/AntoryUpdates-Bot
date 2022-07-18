const { readdirSync } = require('fs');
const ascii = require('ascii-table');
let table = new ascii('Event Status');
table.setHeading('Events', 'Status');

module.exports = (client) => {
    readdirSync("src/Events/").forEach((file) => {
        const events = readdirSync("src/Events/").filter((file) => file.endsWith(".js"));
        for(let file of events) {
            let pull = require(`../Events/${file}`);
            if(pull.name) {
                client.events.set(pull.name, pull);
                table.addRow(file, 'Loaded');
            } else {
                table.addRow(file, 'Error');
                continue;
            }
        }
    });

    console.log(table.toString());
}