const buttons = new MessageActionRow()
.addComponents(
    new MessageButton()
        .setURL("https://github.com/Wolfyxon/mrwolf")
        .setLabel('Source code')
        .setStyle('LINK'),
)

interaction.reply({embeds:[{
"title":"Woof, my name is Mr. Wolf",
"description":`
**I'm here to help you or eat you if you're a bad guy.**
I'm always watching you and other ${interaction.guild.memberCount} people on this server.
My current ping is \`${Date.now() - interaction.createdTimestamp}\`ms.

Check out my **4fun** commands such as \`/tag\`, it's perfect for meme replies.
If you have some cool ideas for the server or just me use \`/suggest\`.
**=)**
`,
"color":"#0033FF"
}],
"components": [buttons]
}
)