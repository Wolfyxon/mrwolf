client.on('guildMemberAdd', async guildMember => {
    var welcomeChannel = client.channels.cache.get(channels["welcomeBye"])
    checkUser(guildMember,welcomeChannel.guild)
    
    setTimeout(function(){
    if(!welcomeChannel.guild.members.cache.get(guildMember.id)){return};
    
    var responses = ["appeared out of nowhere","just logged in","spawned","came from far away","has fallen into the ~~underground~~ server"]
    welcomeChannel.send({embeds:[{
        "title": "⬇ "+guildMember.user.username +" "+responses[random(0,responses.length-1)],
        "color":"GREEN"

    }],content:"<@!"+guildMember.user.id+">"})
},100)
});

client.on('guildMemberRemove', guildMember => {
    var goodbyeChannel = client.channels.cache.get(channels["welcomeBye"])
    var responses = ["just disappeared...","logged out","terminated his connection","forgor about this server 💀","vented","exploded","despawned","has disconnected"]
    goodbyeChannel.send({embeds:[{
        "title": "⬆ "+guildMember.user.username +" "+responses[random(0,responses.length-1)],
        "color":"RED"

    }],content:"<@!"+guildMember.user.id+">"})
});