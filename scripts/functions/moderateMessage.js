function moderateMessage(message,isEdited){

var serverWhitelist = require("./data/allowedServers.json")
var wordBlacklist = require("./data/wordBlacklist.json")
var txt = message.content
	//===
	var txtFormatted = txt.toLowerCase()
	txtFormatted = replaceAll(txtFormatted,"-","")
	txtFormatted = replaceAll(txt," ","")
	txtFormatted = replaceAll(txt,".","")
	txtFormatted = replaceAll(txt,"@","s")
	txtFormatted = replaceAll(txt,"$","s")
	txtFormatted = replaceAll(txt,"ks","x")
	txtFormatted = replaceAll(txt,"3","e")
	txtFormatted = replaceAll(txt,"0","o")
	txtFormatted = replaceAll(txt,"$","s")
	txtFormatted = replaceAll(txt,"4","a")
	//===
var txtSplit = txt.split(" ")
for(var i = 0; i<wordBlacklist.length; i++){
	if(txtFormatted.includes(wordBlacklist[i])){
		message.delete();
		break;
		return;
	}
}
for(var i = 0; i < txtSplit.length; i++){
	if(message.channel.id == channels["partnerServers"]){break}
	if(txtSplit[i].includes("discord.gg/")||txtSplit[i].includes("discord.gg/invite/")||txtSplit[i].includes("discord.com/invite/")){
		if(client.fetchInvite(txtSplit[i])){
			var tmpInvite = client.fetchInvite(txtSplit[i]).then(invite => {
			for(var x = 0; x<serverWhitelist.length; x++){
				if(invite.guild.id != serverWhitelist[x]){
					message.delete();
					message.channel.send("<@!"+message.author.id+"> no invite links!")
					break;
					return;
				}
			}
		})
		}
	}
}

if(!isEdited){
if(!message.member.roles.cache.has(roles["ranked"])){
	if(message.author.id in messageCount_unranked){
		messageCount_unranked[message.author.id] += 1
		if(messageCount_unranked[message.author.id] > 50){
			message.member.roles.add(roles["ranked"])
			message.channel.send({"content":"<@!"+message.author.id+">",embeds:[{
				"title":"You have been ranked!",
				"description":"Now you can send URLs and attach files in messages.",
				"color":"BLUE"
			}]})
			messageCount_unranked[message.author.id] = undefined
		}
	}
	else {
		messageCount_unranked[message.author.id] = 0
	}
}
}
}