if(interaction.member.id == config["owner"]){
    interaction.reply({ content: "shutting down...", ephemeral: true });
    client.user.setStatus('dnd')
    setTimeout(function(){
        console.error("-- SHUTDOWN --")
        process.exit(0)
    },1000)
}
else {
    interaction.reply({ content: templateMsg["noPermsOwner"], ephemeral: true });
}