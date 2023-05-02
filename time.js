const { SlashCommandBuilder } = require('discord.js');

function dateToStr(time) {
    if (time.getMinutes() < 10) {
      return (
        time.getHours() +
        ":0" +
        time.getMinutes() +
        " " +
        Month(time.getMonth()) +
        " " +
        time.getDate() +
        ", " +
        time.getFullYear()
      );
    } else
      return (
        time.getHours() +
        ":" +
        time.getMinutes() +
        " " +
        Month(time.getMonth()) +
        " " +
        time.getDate() +
        ", " +
        time.getFullYear()
      );
  }

function Month(int) {
    switch (int) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
    }
  }

// Javascript Date objects use local machine time
// This implementation is based around my local time of EST
module.exports = {
	data: new SlashCommandBuilder()
		.setName('time')
		.setDescription('Retrieves time in a specific timezone')
        .addStringOption(option =>
			option.setName('timezone')
				.setDescription('The timezone')
				.setRequired(true)
				.addChoices( // Allows the subcommand interface in the Discord client
					{ name: 'EST', value: 'EST' },
					{ name: 'UTC', value: 'UTC' },
					{ name: 'NZDT', value: 'NZDT' },
				)),
	async execute(interaction) {
        const timezone = interaction.options.getString('timezone')
        const time = new Date() // Initializes to your machine's timezone
        if (timezone === 'EST'); // Default machine timezone, requires no update
        else if (timezone === 'UTC') time.setTime(time.getTime()+5*60*60*1000); // UTC is 5 hours ahead, setTime() intakes Epoch Time
        else if (timezone === 'NZDT') time.setTime(time.getTime()+18*60*60*1000); // NZDT is 18 hours ahead
		await interaction.reply(dateToStr(time) + " " + timezone);
	},
};