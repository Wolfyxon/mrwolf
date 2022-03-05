function checkUser(member,guild){
    if(member.user.id == client.user.id){return};
    if(!guild.members.cache.get(member.id)){return};

    const botWhitelist = JSON.parse(fs.readFileSync("./data/botWhitelist.json","utf-8"))
    
	if(member.user.bot){
        if(!botWhitelist.includes(member.user.id)){
            member.ban({reason:"Not whitelisted bot"})
            return
        }
    }
}