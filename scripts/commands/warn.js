const member = interaction.options.getMember('user');
var reason = interaction.options.getString('reason');

if (interaction.member.permissions.has(['MODERATE_MEMBERS'])) {
    if(!member.roles.cache.has(roles["warnBlock"])){
    if(!member.user.bot && member.id != client.user.id){
    interaction.reply("<@"+member.id+"> has been warned")
    warn(member,interaction.member,reason,interaction.guild)
    }
    else {
        interaction.reply({ content: "You can't warn that user!", ephemeral: true });
    }
    }
    else {
        interaction.reply({ content: "This user has warning active\nIf that user is breaking rules inside warning channel just mute them", ephemeral: true });
    }
}  
else {
    interaction.reply({ content: templateMsg["noPerms"], ephemeral: true });
}