const fs = require('node:fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const auth = require('./auth.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync('./functions').filter(folder => 
    fs.statSync(`./functions/${folder}`).isDirectory()
);

for (const folder of functionFolders) {
	const functionFiles = fs
		.readdirSync(`./functions/${folder}`)
		.filter((file) => file.endsWith('.js'));
	for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(auth.token);