require("dotenv").config();
const fs = require("fs");
const ms = require("ms")

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');

const { Client, Collection, Intents, RichEmbed, MessageEmbed, MessageAttachment, MessageButton, Permissions, MessageActionRow, Role } = require('discord.js');
const { resourceUsage } = require("process");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_BANS] });

var config = require("./data/config.json");
var roles = require("./data/roles.json");
var channels = require("./data/channels.json");

var templateMsg = require("./data/messages.json");

client.login(process.env["TOKEN"]);

client.on("ready", () => {
	console.log("Ready!");
	client.user.setStatus('idle')
	setStatus()

	//registerCommands(client.guilds.cache.get(config["mainGuild"]));


})
//reading and writing
function loadsConfig() {
	config = JSON.parse(fs.readFileSync("./data/config.json", "utf-8"))
	channels = JSON.parse(fs.readFileSync("./data/channels.json", "utf-8"))
}
var userdata
function loadUserData() {
	userdata = JSON.parse(fs.readFileSync("./data/dynamic/userdata.json", "utf-8"))
}
function saveUserData() {
	if (userdata != null) {
		if (JSON.stringify(userdata) != null) {
			fs.writeFile("./data/dynamic/userdata.json", JSON.stringify(userdata))
		}
	}
}
//==============

function setStatus() {
	client.user.setStatus('online')
	console.log("Setting status: " + config["status"] + " type: " + config["statusType"])
	client.user.setActivity(config["status"], { type: config["statusType"] })
}

async function registerCommands(guild) {
	try {
		console.log("[/] Registering slash commands")
		//var guild = client.guilds.cache.get(config["mainGuild"]);
		let commands;
		commands = guild.commands;
		commandsBody = require("./data/commands.json");

		const timer = ms_ => new Promise(res => setTimeout(res, ms_))
		for (var i = 0; i < commandsBody.length; i++) {
			commands?.create(commandsBody[i]);
			console.log("(" + (i + 1) + "/" + commandsBody.length + ") Registered " + commandsBody[i]["name"]);
			await timer(600);
		}
		console.log("[/] Registered");
		console.log("Some commands may appear in 1 minute because of rate limits")
	}
	catch (e) {
		console.log("Error registering slash commands: " + e)
	}
}
async function registerMenus(guild){
	const rest = new REST({"version":"9"}).setToken(process.env["TOKEN"])
	var menus = [
		{"name":"translate","type":3}
	]//will be stored in file if there's more context menus

	try {
		console.log("[=] Registering context menus...")
		await rest.put(Routes.applicationGuildCommands(client.user.id,guild.id),{body: menus})
		.then(() => console.log("[=] Registered"))
	}
	catch(e) {
		console.error("[=] Registering context menus failed: "+e)
	}
}


var rateLimitedUsers = ["userid"]
var rateLimitedUsers_btn = ["userid"]
client.on('interactionCreate', async interaction => {
	if (interaction.member.user.bot) { return };
	if (interaction.isCommand()){	
	if (!rateLimitedUsers.includes(interaction.member.id)) {
		rateLimitedUsers.push(interaction.member.id)
		setTimeout(function () { rateLimitedUsers = removeItemOnce(rateLimitedUsers, interaction.member.id) }, 3000)
		
		const { commandName } = interaction;
		console.log(interaction.member.user.tag + " used: /" + commandName)

		var script = "./scripts/commands/" + commandName + ".js";
		if (fs.existsSync(script)) {
			eval(fs.readFileSync(script, "utf-8"));
		}
		else {
			console.log("ERROR: " + script + " not found")
			interaction.reply({ content: ':warning: Command not found!', ephemeral: true });
		}

	}
	else {
		if(interaction.member == client.user.id){return};
		interaction.reply({ content: 'Not that fast!', ephemeral: true });
	}
}
if (interaction.isButton()){
	if(interaction.message.author.id != client.user.id){return}
	console.log(interaction.member.user.tag+" clicked "+interaction.customId)
	if(!rateLimitedUsers_btn.includes(interaction.member.id)){
	eval(fs.readFileSync("./scripts/suggestionButtonManager.js","utf-8"));
	eval(fs.readFileSync("./scripts/warnButtonManager.js","utf-8"));
	
	setTimeout(function(){
		if(rateLimitedUsers_btn.includes(interaction.member.id)){
			removeItemOnce(rateLimitedUsers_btn,interaction.member.id)
		}
	})
}

}
if(interaction.isContextMenu){
	const { commandName } = interaction;
	console.log(interaction.member.user.tag + " used: /" + commandName)

	var script = "./scripts/contextMenus/" + commandName + ".js";
	if (fs.existsSync(script)) {
		eval(fs.readFileSync(script, "utf-8"));
	}
	else {
		console.log("ERROR: " + script + " not found")
		interaction.reply({ content: ':warning: Option not found!', ephemeral: true });
	}
}

});


var antiSpam_cooldown_users = []
var antiSpam_warning_count = {
	"userid": 0 //example if user has more than X warnings (not warn(), but "stop spamming") it will warn or mute them
}

var messageCount_unranked = {

}
client.on("messageCreate", async message => {
	if (message.webhookId){return};
	eval(fs.readFileSync("./scripts/functions/moderateMessage.js", "utf-8"))
	console.log("Message: \n" + message.content + "\nby: " + message.author.tag + " (" + message.author.id + ")")
	moderateMessage(message,false)
	checkUser(message.member, message.guild)
	isInsult(message)



	//anti spam
	if(message.author.bot){return}
	if(!antiSpam_cooldown_users.includes(message.author.id)){
	antiSpam_cooldown_users.push(message.author.id)
	setTimeout(function(){antiSpam_cooldown_users = removeItemOnce(antiSpam_cooldown_users,message.author.id)},3000)
	}
	else {
		if(message.author.id in antiSpam_warning_count){
			if(antiSpam_warning_count[message.author.id] > 1){
				message.delete()
			}
			if(antiSpam_warning_count[message.author.id] > 4){
				message.channel.send("<@!"+message.author.id+"> slow down!")
			}
			if(antiSpam_warning_count[message.author.id] > 5){
				if(member.moderatable){
				message.member.timeout(60,"Automod: spam")
				message.channel.send("<@!"+message.author.id+"> you have been muted for 1 minute for spamming!")
				antiSpam_warning_count[message.author.id] = 0
				}
			}

			//===
			antiSpam_warning_count[message.author.id] += 1
			setTimeout(function(){
				if(antiSpam_warning_count[message.author.id]>0){
					antiSpam_warning_count[message.author.id] -= 1
				}
			},6000)
		}
		else {
			antiSpam_warning_count[message.author.id] = 0
		}
	}
	//===

	//Command and response zone, do not add anything else
	if(message.author.bot){return}
	if (message.content === "<@" + client.user.id + ">" || message.content === "<@!" + client.user.id + ">") {
		message.reply("Woof!")
	}

	//=========
	if (message.content.startsWith("w!")) {
		message.reply({
			embeds: [
				{
					"title": "I use slash commands now!",
					"description": "Did you mean `" + message.content.replace("w!", "/") + "`?",
					"color": "RED"
				}
			]
		})
	}
	if (message.content.startsWith("!report")) {
		message.reply("Did you mean `/report`?")
	}
	if (message.content.startsWith("!suggest") || message.content.startsWith("!sugest")) {
		message.reply("Did you mean `/suggest`?")
	}
	//==========
})

client.on('messageUpdate', (oldMessage, message) => {
	eval(fs.readFileSync("./scripts/functions/moderateMessage.js", "utf-8"))
	moderateMessage(message,true)

	if(message.author.bot){return}
	if(!message.content.length < 1024){return}
	client.channels.cache.get(channels["msgLog"]).send({embeds:[{
		"title":"Message edited",
		"description":"by: <@!"+message.author.id+"> in <#"+message.channel.id+">",
		"color":"GOLD",
		"fields": [
			{
				name: 'Before',
				value: oldMessage.content,
			},
			{
				name: 'After',
				value: message.content,
			}
		]
	}]})
 })
 client.on("messageDelete", (message) => {
	if(message.author.bot){return}
	
	if(!message.content.length < 1024){return}
	client.channels.cache.get(channels["msgLog"]).send({embeds:[{
		"title":"Message deleted",
		"description":"by: <@!"+message.author.id+"> in <#"+message.channel.id+">",
		"color":"RED",
		"fields": [
			{
				name: 'Message',
				value: message.content,
			}
		]
	}]})
});


//helper functions
function random(bottom, top) {
	return Math.floor(Math.random() * (1 + top - bottom)) + bottom;
}

function replaceAll(str, find, replace) {
	if (!str) { return "undefined" }
	if (str.includes(find)) {
		var newStr = str
		var findCount = str.split(find).length - 1

		for (var i = 0; i < findCount; i++) {
			newStr = newStr.replace(find, replace)
		}
		return newStr
	}
	else {
		return str
	}
}

function removeItemOnce(arr, value) {
	var index = arr.indexOf(value);
	if (index > -1) {
		arr.splice(index, 1);
	}
	return arr;
}

eval(fs.readFileSync("./scripts/functions/warn.js", "utf-8"))
eval(fs.readFileSync("./scripts/functions/coreProtection.js", "utf-8"))
eval(fs.readFileSync("./scripts/functions/aiResponse.js", "utf-8"))
eval(fs.readFileSync("./scripts/joinLeaveManager.js","utf-8"))


//Error handling DO NOT TOUCH
process.on('uncaughtException', function (exception) {
console.error("ERROR: "+exception+"\n"+exception.stack)
var ignored = ["DiscordAPIError: Unknown Message","DiscordAPIError: Cannot send messages to this user","DiscordAPIError: Unknown interaction","DiscordAPIError: Interaction has already been acknowledged."]
if(!ignored.includes(exception.toString())){
client.channels.cache.get(channels["botlog"]).send("<@!"+config["owner"]+"> \n`"+exception+"`\nStack:\n```"+exception.stack+"\n```")
}
});
