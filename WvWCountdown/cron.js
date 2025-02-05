const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');
const fs = require('fs');
const auth = require('./auth.json');
const { getLockoutTimer, getMatchEndTime, getTeamAssignmentTimer } = require('./functions/functions.js')

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

function orderofoperations() {
	getMatchEndTime((error, Value) => {
		if (error) {
			console.log('Error:', error);
		} else {
			//console.log('Reset Timer Value:', Value);
			let LockOutDate = Value
			let currentDate = new Date();
			let dateToCompare = Date.parse(LockOutDate);
			let diff = dateToCompare - currentDate;
			let days = Math.floor(diff / (1000 * 60 * 60 * 24));
			let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			let status = `${days} days, ${hours} hours, ${minutes} minutes`
			console.log(`Reset in: ${status}`);
			//client.user.setActivity(status);
			global.matchend = `Reset in: ${status}`;
		}
	});

	getTeamAssignmentTimer((error, Value) => {
		if (error) {
			console.log('Error:', error);
		} else {
			//console.log('Team Assignment Timer Value:', Value);
			let LockOutDate = Value
			let currentDate = new Date();
			let dateToCompare = Date.parse(LockOutDate);
			let diff = dateToCompare - currentDate;
			let days = Math.floor(diff / (1000 * 60 * 60 * 24));
			let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			let status = `${days} days, ${hours} hours, ${minutes} minutes`
			console.log(`Team Assignment in: ${status}`);
			//client.user.setActivity(status);
			global.teamassignment = `Team Assignment in: ${status}`;
		}
	});

	getLockoutTimer((error, Value) => {
		if (error) {
			console.log('Error:', error);
		} else {
			//console.log('Lockout Timer Value:', Value);
			let LockOutDate = Value
			let currentDate = new Date();
			let dateToCompare = Date.parse(LockOutDate);
			let diff = dateToCompare - currentDate;
			let days = Math.floor(diff / (1000 * 60 * 60 * 24));
			let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			let status = `${days} days, ${hours} hours, ${minutes} minutes`
			console.log(`Lockout in: ${status}`);
			//client.user.setActivity(status);
			global.lockout = `Lockout in: ${status}`;
		}
	});

	//callback();
}

// function step() {
// 	console.log('creating posts!');
// 	fs.readFile('./commands/data/subscriptions.json', 'utf8', (err, data) => {
// 		if (err) throw err;
// 		const dataObject = JSON.parse(data);
// 		// console.log(dataObject);
// 		for (let i = 0; i < dataObject.length; i++) {
// 			const subscribedGuild = client.guilds.cache.get(dataObject[i].guildId);
// 			const subscribedChannel = client.channels.cache.get(dataObject[i].channelId);
// 			console.log(`posting ${dataObject[i].TimerType} to ${subscribedGuild.name} in ${subscribedChannel.name}`);
// 			subscribedChannel.send(`Message Here!`)
// 				.catch(console.error);
// 		}
// 	});
// }

client.on('ready', () => {
	// once every minute check

	if (global.matchend) {
		client.user.setActivity(
			`${global.matchend}`
		)
	} else {
		client.user.setActivity(
			`...App Loading...`
		)
	}
	
	cron.schedule('* * * * *', function() {
		console.log('updating times!');
		
		orderofoperations()

		if (global.matchend) {
			client.user.setActivity(
				`${global.matchend}`
			)
		} else {
			client.user.setActivity(
				`...App Loading...`
			)
		}
	}, {
		timezone: 'America/Denver'
	});
});

client.login(auth.token);
