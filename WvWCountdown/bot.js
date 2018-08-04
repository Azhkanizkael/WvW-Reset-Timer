const Discord = require('discord.js');
const countdown = require('countdown');
const request = require('request');
var auth = require('./auth.json');
const client = new Discord.Client();
var url = 'https://api.guildwars2.com/v2/wvw/matches/1-1?access_token=' + auth.gw2token;

var req = request.get(url, { json: true }, (err, res, body) => {
if (err) { return console.log(err); }
    var vEndTime = body.end_time;
    // Initialize Discord Bot
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
        console.log(`WvW Ends at: ${vEndTime}`);
        console.log(countdown(new Date(),new Date(vEndTime), countdown.DAYS | countdown.HOURS | countdown.MINUTES).toString());
        client.user.setStatus('available')
        client.user.setPresence({
            game: {
                name: countdown(new Date(),new Date(vEndTime), countdown.DAYS | countdown.HOURS | countdown.MINUTES).toString()
            }
        });
        console.log();
        setInterval(() => {
            var vEndTime = body.end_time;
            var datetime = countdown(new Date(),new Date(vEndTime), countdown.DAYS | countdown.HOURS | countdown.MINUTES).toString();
            console.log(datetime);
            client.user.setActivity(datetime)
        }, 60000)
    });
    client.login(auth.token);
});