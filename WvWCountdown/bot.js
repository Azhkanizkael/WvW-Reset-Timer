const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const auth = require('./auth.json');
const url = `https://api.guildwars2.com/v2/wvw/matches/${auth.region}-1?access_token=${auth.gw2token}`;

const request = require('request');


function getApi(){
   request.get(url, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        global.vEndTime = body.end_time;
        // console.log(global.vEndTime);
    0});
};

client.on('ready', () => {
    getApi();
    // console.log(`Logged in as ${client.user.tag}!`);
    // console.log(`WvW Ends at: ${global.vEndTime}`);

    client.user.setStatus('available');
    client.user.setPresence({
        game: {
            name: "Connecting to API..."
        }
    });
    
    setInterval(() => {
        getApi();
        let currentDate = new Date();
        let dateToCompare = Date.parse(global.vEndTime);
        let diff = dateToCompare - currentDate;
        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        // console.log(`${days} days, ${hours} hours, ${minutes} minutes`);
        client.user.setActivity(`${days} days, ${hours} hours, ${minutes} minutes`);
    }, 60000)
});

client.login(auth.token);
