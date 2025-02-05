const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');
const fs = require('fs');
const auth = require('./auth.json');
const { getLockoutTimer, getMatchEndTime, getTeamAssignmentTimer } = require('./functions/functions.js')

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

async function getTimes() {
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
			global.matchenddays = days;
			global.matchendhours = hours;
			global.matchendminutes = minutes;
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
			global.teamassignmentdays = days;
			global.teamassignmenthours = hours;
			global.teamassignmentminutes = minutes;
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
			global.lockoutdays = days;
			global.lockouthours = hours;
			global.lockoutminutes = minutes;
		}
	});
}

async function post(timerType,days,hours,minutes) {
	console.log(`creating posts for ${timerType}/${days}/${hours}/${minutes}`);
	fs.readFile('./commands/data/subscriptions.json', 'utf8', (err, data) => {
		if (err) throw err;
		const dataObject = JSON.parse(data);
		// console.log(dataObject);
		for (let i = 0; i < dataObject.length; i++) {
			const subscribedGuild = client.guilds.cache.get(dataObject[i].guildId);
			const subscribedChannel = client.channels.cache.get(dataObject[i].channelId);
			const subscribedTimerType = dataObject[i].Timer;
			const subscribedDays = dataObject[i].DaysBefore;
			const subscribedHours = dataObject[i].HoursBefore;
			const subscribedMinutes = dataObject[i].MinutesBefore;
			const subscribedPing = dataObject[i].Ping;
			
			if (subscribedTimerType == timerType && subscribedDays == days && subscribedHours == hours && subscribedMinutes == minutes) {
				console.log(`posting ${subscribedTimerType} to ${subscribedGuild.name} in ${subscribedChannel.name}`);
				if (subscribedPing == null) {
					subscribedChannel.send(`${timerType} in: ${days} days, ${hours} hours, ${minutes} minutes`)
						.catch(console.error);
				} else {
					subscribedChannel.send(`${Ping}! ${timerType} in: ${days} days, ${hours} hours, ${minutes} minutes`)
						.catch(console.error);
				}
			}
		}
	});
}

async function executetasks() {
	let times = await getTimes();

	if(global.matchend){
		post('reset',global.matchenddays,global.matchendhours,global.matchendminutes);
		post('lockout',global.lockoutdays,global.lockouthours,global.lockoutminutes);
		post('teamassignment',global.teamassignmentdays,global.teamassignmenthours,global.teamassignmentminutes);
	}
}

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
		console.log('updating times...');
		
		executetasks();

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
