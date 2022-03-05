const tag = interaction.options.getString('tag');

var tags = JSON.parse(fs.readFileSync("./data/tags.json"))
if(tag in tags){
const file = new MessageAttachment("./data/files/tags/"+tags[tag]);
interaction.reply({files:[file]})
}
else {
    var tagKeys = []
    for (var i in tags) {
        tagKeys.push(i);
    }
    var key = tagKeys[random(0,tagKeys.length)]
    if(key){
    var tip = key.split("")[0]+key.split("")[1]+"..."
    if(key.length < 3){tip = tip.replace("...","")}
    interaction.reply({ content: 'Tag not found. TIP: **'+tip+"**", ephemeral: true });
    }
    else {
        interaction.reply({ content: "Tag not found.", ephemeral: true });
    }

    
}