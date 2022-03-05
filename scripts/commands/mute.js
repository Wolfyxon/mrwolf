
const member = interaction.options.getMember('user');
const strDuration = interaction.options.getString('duration');
var reason = interaction.options.getString('reason');

if (interaction.member.permissions.has(['MODERATE_MEMBERS'])) {
    if(member.moderatable){
        const duration = ms(strDuration)
        if(duration){
        if(reason == null){reason = "No reason provided"}
        member.timeout(duration,interaction.member.user.tag+": "+reason)
        interaction.reply("User <@"+member.id+"> has been muted for `"+strDuration+"`")
        }
        else {
            interaction.reply({ content: "Invalid duration!", ephemeral: true });
        }
    }
    else {
        interaction.reply({ content: "Cannot mute that user", ephemeral: true });
    }
}
else {
    interaction.reply({ content: templateMsg["noPerms"], ephemeral: true });
}