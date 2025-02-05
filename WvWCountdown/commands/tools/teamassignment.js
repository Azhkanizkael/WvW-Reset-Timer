const { SlashCommandBuilder } = require('discord.js');
const { getTeamAssignmentTimer } = require('../../functions/functions.js')



module.exports = {
	data: new SlashCommandBuilder()
		.setName('teamassignment')
		.setDescription('Returns time until Team Assignment'),
	async execute(interaction) {
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
        const message = await interaction.deferReply({
			fetchReply: true,
		});
		await interaction.editReply({
			content: global.teamassignment,
		});
	},
};