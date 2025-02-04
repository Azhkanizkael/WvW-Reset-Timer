const { Client, GatewayIntentBits } = require('discord.js');
const https = require('https');
const cron = require('node-cron');
const fs = require('fs');
const auth = require('./auth.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const url = `https://api.guildwars2.com/v2/wvw/matches/${auth.region}-1`;
const lockouturl = `https://api.guildwars2.com/v2/wvw/timers/lockout`;

function getApi(){	
	https.get(url, (res) => {
		if (err) throw err;
		let data = '';
		res.on('data', (chunk) => {
			data += chunk;
		});
		res.on('end', () => {
			const responseData = JSON.parse(data);
			// console.log(responseData.end_time);
			global.vEndTime = responseData.end_time
		});
	  });
};

function getLockoutApi(){	
	https.get(lockouturl, (res) => {
		if (err) throw err;
		let data = '';
		res.on('data', (chunk) => {
			data += chunk;
		});
		res.on('end', () => {
			const responseLockoutData = JSON.parse(data);
			// console.log(responseData.end_time);
			global.vEndTime = responseLockoutData.na
		});
	  });
};

client.on('ready', () => {
	cron.schedule('* * * * *', function() {
		console.log('updating times!');
		client.user.setStatus('available');
		client.user.setPresence({
			game: {
				name: "Connecting to API..."
			}
		});
		
		getApi();
		getLockoutApi();
		
		let currentDate = new Date();
		let dateToCompare = Date.parse(global.vEndTime);
		let diff = dateToCompare - currentDate;
		let days = Math.floor(diff / (1000 * 60 * 60 * 24));
		let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		let status = `${days} days, ${hours} hours, ${minutes} minutes`
		// console.log(status);
		client.user.setActivity(status);
	}, {
		timezone: 'America/Denver'
	});
});

client.login(auth.token);
