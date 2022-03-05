switch(interaction.customId){
    case "sg_accept":
        if(interaction.member.roles.cache.has(roles["suggestionManager"])){
            var newEmbed = interaction.message.embeds[0]
            newEmbed.color = "#00FF33"
            newEmbed.title = interaction.message.embeds[0].title.replace("💡","✅").replace("❌","✅")
            interaction.message.edit({content:interaction.message.content,embeds:[newEmbed],components: interaction.message.components,files:interaction.message.files})

            interaction.reply({ content: "Suggestion has been ACCEPTED", ephemeral: true });
        }
        else {
            interaction.reply({ content: templateMsg["noPerms"], ephemeral: true });
        }
    break;
    case "sg_reject":
        if(interaction.member.roles.cache.has(roles["suggestionManager"])){
            var newEmbed = interaction.message.embeds[0]
            newEmbed.color = "#FF0000"
            newEmbed.title = interaction.message.embeds[0].title.replace("💡","❌").replace("✅","❌")
            interaction.message.edit({content:interaction.message.content,embeds:[newEmbed],components: interaction.message.components,files:interaction.message.files})

            interaction.reply({ content: "Suggestion has been REJECTED", ephemeral: true });
        }
        else {
            interaction.reply({ content: templateMsg["noPerms"], ephemeral: true });
        }
    break;
}