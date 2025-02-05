const { SlashCommandBuilder } = require('discord.js');
const { getLockoutTimer } = require('../../functions/functions.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lockout')
		.setDescription('Returns time until Lockout'),
	async execute(interaction) {
        const lockoutTime = await getLockoutTimer();
        let currentDate = new Date();
        let dateToCompare = Date.parse(lockoutTime);
        let diff = dateToCompare - currentDate;
        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let status = `${days} days, ${hours} hours, ${minutes} minutes`;
        console.log(`Lockout in: ${status}`);
        global.lockout = `Lockout in: ${status}`;
        global.lockoutdays = days;
        global.lockouthours = hours;
        global.lockoutminutes = minutes;
        const message = await interaction.deferReply({
			fetchReply: true,
		});
		await interaction.editReply({
			content: global.lockout,
		});
	},
};