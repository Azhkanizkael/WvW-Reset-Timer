const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const auth = require('./auth.json');
const url = `https://api.guildwars2.com/v2/wvw/matches/${auth.region}-1?access_token=${auth.gw2token}`;

const countdown = require('countdown');
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
        var datetime = countdown(new Date(),new Date(global.vEndTime), countdown.DAYS | countdown.HOURS | countdown.MINUTES).toString();
        // console.log(datetime);
        client.user.setActivity(datetime);
    }, 60000)
});

client.login(auth.token);
