const Discord = require('discord.js');
const client = new Discord.Client();
var auth = require('./auth.json');
// Initialize Discord Bot
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setStatus('available')
    client.user.setPresence({
        game: {
            name: 'ETA Til Reset',
            type: "STREAMING",
            url: "https://wvwintel.com/#1019"
        }
    });
});
client.login(auth.token);