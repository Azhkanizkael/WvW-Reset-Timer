const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('subscribe')
		.setDescription('subscribe to automated alerts')
		.addStringOption(option => option
			.setName('Timer Type')
			.setDescription('Timer Type')
			.setAutocomplete(true)
			.setRequired(true)),
	async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
		const filtered = pairs.filter(choice => choice.name.toLowerCase().includes(focusedValue.toLowerCase()));
		let options = ({
            name: "lockout", value: "1"
        },{
            name: "reset", value: "2"
        },{
            name: "team assignment", value: "3"
        })
		await interaction.respond(
			options.map(choice => ({ name: choice.name, value: choice.value })),
		);
	},
	async execute(interaction) {
		const option1 = interaction.options.getString('Timer');
		const option2 = interaction.options.getString('Timer');
		const option3 = interaction.options.getString('Timer');
		const option4 = interaction.options.getString('Timer');
		console.log(`Subscription requested for ${option} in Guild: ${interaction.guild.id}, Channel: ${interaction.channel.id}`);
		const subscription = {
			guildId: interaction.guild.id,
			channelId: interaction.channel.id,
			Timer: option1,
            DaysBefore: option2,
            HoursBefore: option3,
            MinutesBefore: option4 
		};
		// './commands/data/subscriptions.json'
		fs.readFile('./commands/data/subscriptions.json', 'utf8', (err, data) => {
			if (err) throw err;
			const dataObject = JSON.parse(data);
			if (!dataObject.some(item => item.guildId === subscription.guildId && item.channelId === subscription.channelId && item.URI === subscription.URI)) {
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
		await interaction.reply({ content: `Subscription Created for ${option} for ${interaction.guild.name} in the ${interaction.channel.name} channel` });
	},
};