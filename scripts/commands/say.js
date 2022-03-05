const msg = interaction.options.getString('message');

interaction.deferReply()
interaction.deleteReply()
if(config["owner"] == interaction.member.user.id){
    interaction.channel.send(msg)
}