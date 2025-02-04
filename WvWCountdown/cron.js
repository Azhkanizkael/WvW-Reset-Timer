const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');
const fs = require('fs');
const auth = require('./auth.json');
const { getLockoutTimer, getMatchEndTime, getTeamAssignmentTimer } = require('./functions/functions.js')

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
	// once every minute check
	cron.schedule('* * * * *', function() {
		console.log('updating times!');
		
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
				console.log(`Reset is in: ${status}`);
				client.user.setActivity(status);
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
				console.log(`Team Assignment is in: ${status}`);
				//client.user.setActivity(status);
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
				console.log(`Lockout is in: ${status}`);
				//client.user.setActivity(status);
			}
		});
	}, {
		timezone: 'America/Denver'
	});
});

client.login(auth.token);
