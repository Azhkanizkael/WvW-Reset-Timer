const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

const choices = require('../data/timertypes.json');
const pairs = choices.map(options => ({ name: options[0], value: options[0] }));

module.exports = {
	data: new SlashCommandBuilder()
		.setName('subscribe')
		.setDescription('subscribe to automated alerts')
		.addStringOption(option => option
			.setName('timertype')
			.setDescription('Select a timer type')
			.setAutocomplete(true)
			.setRequired(true))
		.addStringOption(option => option
			.setName('days')
			.setDescription('How many days prior would you like the alert?')
			.setRequired(true))
		.addStringOption(option => option
			.setName('hours')
			.setDescription('How many hours prior would you like the alert?')
			.setRequired(true))
		.addStringOption(option => option
			.setName('minutes')
			.setDescription('How many minutes prior would you like the alert?')
			.setRequired(true))
		.addStringOption(option => option
			.setName('ping')
			.setDescription('What group would you like to ping with this alert? (leave blank for none)')
			.setRequired(false))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
	async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
		const filtered = pairs.filter(choice => choice.name.toLowerCase().includes(focusedValue.toLowerCase()));
		let options;
		if (filtered.length > 25) {
			options = filtered.slice(0, 25);
		}
		else {
			options = filtered;
		}
		await interaction.respond(
			options.map(choice => ({ name: choice.name, value: choice.value })),
		);
	},
	async execute(interaction) {
		const option1 = interaction.options.getString('timertype');
		const option2 = interaction.options.getString('days');
		const option3 = interaction.options.getString('hours');
		const option4 = interaction.options.getString('minutes');
		const option5 = interaction.options.getString('ping');
		console.log(`Subscription requested for ${option1} (days: ${option2}, hours: ${option3}, minutes: ${option4}, ping: ${option5}) in Guild: ${interaction.guild.id}, Channel: ${interaction.channel.id}`);
		const subscription = {
			guildId: interaction.guild.id,
			channelId: interaction.channel.id,
			Timer: option1,
            DaysBefore: option2,
            HoursBefore: option3,
            MinutesBefore: option4,
			Ping: option5
		};
		// './commands/data/subscriptions.json'
		fs.readFile('./commands/data/subscriptions.json', 'utf8', (err, data) => {
			if (err) throw err;
			const dataObject = JSON.parse(data);
			if (!dataObject.some(
					item => item.guildId === subscription.guildId 
					&& item.channelId === subscription.channelId 
					&& item.timer === subscription.Timer 
					&& item.daysbefore === subscription.DaysBefore
					&& item.hoursbefore === subscription.HoursBefore
					&& item.minutesbefore === subscription.MinutesBefore
					&& item.ping === subscription.Ping)) {
				dataObject.push(subscription);
				fs.writeFile('./commands/data/subscriptions.json', JSON.stringify(dataObject), (err) => {
					if (err) throw err;
					console.log('Data written to file');
				});
			}
			else {
				console.log('Data already exists in file');
			}
		});
		await interaction.reply({ content: `Subscription Created for ${option1} (days: ${option2}, hours: ${option3}, minutes: ${option4}, ping: ${option5}) for ${interaction.guild.name} in the ${interaction.channel.name} channel` });
	},
};