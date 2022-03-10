const translate = require('@vitalets/google-translate-api');

var langReplacements = {
    "en":"us",
    "ja":"jp",
    "zh-CN":"cn",
    "zh-TW":"tw"
}

console.log("target message "+interaction.targetMessage.content)
translate(interaction.targetMessage.content).then(res => {
    var country_code = res.from.language.iso.toLowerCase()
    if(country_code in langReplacements){country_code = country_code.replace(country_code,langReplacements[country_code])}

    interaction.reply({embeds:[{
        "title":"Translating from :flag_"+country_code+":",
        "description":"[Jump to original message](https://discord.com/channels/"+interaction.guild.id+"/"+interaction.channel.id+"/"+interaction.targetMessage.id+")\n"+res.text,
        "color":"#3399FF"
    }]})

}).catch(err => {
    interaction.reply("Translation failed!")
})
