const Discord = require('discord.js');
const countdown = require('countdown');
const request = require('request');
var auth = require('./auth.json');
const client = new Discord.Client();
var url = 'https://api.guildwars2.com/v2/wvw/matches/1-1?access_token=' + auth.gw2token;

function getApi(){
    console.log(request.get(url, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        global.vEndTime = body.end_time;
        console.log(global.vEndTime);
    }));
};

client.on('ready', () => {
    getApi();
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`WvW Ends at: ${global.vEndTime}`);
    console.log(countdown(new Date(),new Date(global.vEndTime), countdown.DAYS | countdown.HOURS | countdown.MINUTES).toString());
    client.user.setStatus('available');
    client.user.setPresence({
        game: {
            name: "Connecting to API..."
        }
    });
    console.log();
    setInterval(() => {
        var datetime = countdown(new Date(),new Date(global.vEndTime), countdown.DAYS | countdown.HOURS | countdown.MINUTES).toString();
        console.log(datetime);
        client.user.setActivity(datetime);
        if ( Date.parse(new Date()) > Date.parse(global.vEndTime)){
            getApi();
            var datetime = countdown(new Date(),new Date(global.vEndTime), countdown.DAYS | countdown.HOURS | countdown.MINUTES).toString();
            client.user.setActivity(datetime);
        };
    }, 60000)
});
client.login(auth.token);
