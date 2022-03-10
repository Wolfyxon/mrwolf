if(config["masters"].includes(interaction.member.user.id)){
    interaction.reply({content:"It can take up to 30 seconds", ephemeral: true })
	interaction.guild.commands.set([]);
	client.application.commands.set([]);

    setTimeout(function(){registerCommands(interaction.guild)},4000)
    registerMenus(interaction.guild)
}
else {
    interaction.reply({content:templateMsg["noPermsMaster"], ephemeral: true })
}