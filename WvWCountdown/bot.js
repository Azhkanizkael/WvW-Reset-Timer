const { Client, GatewayIntentBits } = require('discord.js');
const https = require('https');
const cron = require('node-cron');
const fs = require('fs');
const auth = require('./auth.json');
const fn = require('./functions/functions.js')

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const matchurl = `https://api.guildwars2.com/v2/wvw/matches/${auth.region}-1`;

client.on('ready', () => {
	// once every minute check
	cron.schedule('* * * * *', function() {
		console.log('updating times!');
		
		//fn.getMatchEndTime();
		fn.getLockoutTime(lockoutTime);
		console.log(lockoutTime);
		
		//let currentDate = new Date();
		//let dateToCompare = Date.parse(global.vEndTime);
		//let diff = dateToCompare - currentDate;
		//let days = Math.floor(diff / (1000 * 60 * 60 * 24));
		//let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		//let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		//let status = `${days} days, ${hours} hours, ${minutes} minutes`
		// console.log(status);
		//client.user.setActivity(status);
	}, {
		timezone: 'America/Denver'
	});
});

client.login(auth.token);
