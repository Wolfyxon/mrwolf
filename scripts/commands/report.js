const description = interaction.options.getString('description');

interaction.reply({ content: 'Thanks for your report', ephemeral: true });
client.channels.cache.get(channels["reports"]).send({"content":"New report!","embeds":[{
    "title":"REPORT",
    "description":"submited by <@!"+interaction.member.id+">",
    "fields":[{
        "name":"Content",
        "value": description,
        "color":"#FF9900"
    }]
}]})