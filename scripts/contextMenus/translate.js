const translate = require('@vitalets/google-translate-api');

console.log("target message "+interaction.targetMessage.content)
translate(interaction.targetMessage.content).then(res => {
    interaction.reply({embeds:[{
        "title":"Translating from :flag_"+res.from.language.iso.toLowerCase().replace("zh-","")+":",
        "description":"[Jump to original message](https://discord.com/channels/"+interaction.guild.id+"/"+interaction.channel.id+"/"+interaction.targetMessage.id+")",
        "fields":[{
            "name":"result",
            "value":res.text
        }],
        "color":"#3399FF"
    }]})

}).catch(err => {
    interaction.reply("Translation failed!")
})
