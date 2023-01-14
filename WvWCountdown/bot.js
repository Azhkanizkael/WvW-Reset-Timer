const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const https = require('https');

const auth = require('./auth.json');
const url = `https://api.guildwars2.com/v2/wvw/matches/${auth.region}-1?access_token=${auth.gw2token}`;

function getApi(){	
	https.get(url, (res) => {
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

client.on('ready', () => {
	getApi();
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
        let status = `${days} days, ${hours} hours, ${minutes} minutes`
		// console.log(status);
        client.user.setActivity(status);
	}, 60000)
});

client.login(auth.token);
