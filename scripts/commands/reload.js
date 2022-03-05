if(config["masters"].includes(interaction.member.user.id)){
loadUserData()
loadConfigs()
interaction.reply({ content: 'Reloaded', ephemeral: true });
}
else {
    interaction.reply({ content: templateMsg["noPermsMaster"], ephemeral: true });
}