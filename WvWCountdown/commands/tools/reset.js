const { SlashCommandBuilder } = require('discord.js');
const { getMatchEndTime } = require('../../functions/functions.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('Returns time until Reset'),
	async execute(interaction) {
		const matchEndTime = await getMatchEndTime();
        let currentDate = new Date();
        let dateToCompare = Date.parse(matchEndTime);
        let diff = dateToCompare - currentDate;
        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let status = `${days} days, ${hours} hours, ${minutes} minutes`;
        console.log(`Reset in: ${status}`);
        global.matchend = `Reset in: ${status}`;
        global.matchenddays = days;
        global.matchendhours = hours;
        global.matchendminutes = minutes;
        const message = await interaction.deferReply({
			fetchReply: true,
		});
		await interaction.editReply({
			content: global.matchend,
		});
	},
};