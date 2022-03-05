const member = interaction.options.getMember('user');

if (interaction.member.permissions.has(['MODERATE_MEMBERS'])) {
    if(member.roles.cache.has(roles["warnBlock"])){
    if(member.user.id != interaction.member.user.id){
    interaction.reply("<@"+member.id+">'s warning has been canceled. \nYour access will be back soon. **Sorry!**")
    setTimeout(function(){
        if(member.roles.cache.has(roles["warnBlock"])){member.roles.remove(roles["warnBlock"])}
    },2000)
    }
    else {
        interaction.reply({content:"You cannot your own warning! Even owner can't do that.",ephemeral: true})
    }
}
else {
    interaction.reply({ content: "This user has currently no warnings active", ephemeral: true });
}
}  
else {
    interaction.reply({ content: templateMsg["noPerms"], ephemeral: true });
}