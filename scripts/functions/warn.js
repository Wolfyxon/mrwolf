
function warn(target,executor,reason,guild){
    if(target.roles.cache.has(roles["warnBlock"])){return}
    target.roles.add(roles["warnBlock"])

    const buttons = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('warning_accept')
            .setLabel('✅ I have read rules and I accept my warning')
            .setStyle('DANGER'),
    )
    .addComponents(
      new MessageButton()
          .setCustomId('warning_decline')
          .setLabel('Cancel')
          .setStyle('SECONDARY'),
  );

	guild.channels.create("warn-"+target.user.username+" "+random(0,99), {
        type: "text",
        permissionOverwrites: [
           {
             id: guild.roles.everyone,
             deny: ['VIEW_CHANNEL']
		   },
           {
            id: target,
            allow: ['VIEW_CHANNEL']
          },
          {
              id: guild.roles.cache.get(roles["staff"]),
              allow: ['VIEW_CHANNEL']
          }
        ],
      })
      .then(channel => {
        //channel.setParent(channel["warnCategory"])

          channel.send({embeds:[
              {
                  "color":"#FF6600",
                  "title":":warning: You have been warned! :warning:",
                  "description":"You have been warned for following reason: \n \
                  ```"+reason+"\n``` \n \
                  by moderator: <@"+executor.id+">\n \
                  **Please review <#"+channels["rules"]+"> and your warning to continue** \n \
                  FUTURE WARNINGS MAY RESULT A MUTE, KICK OR **BAN**",
                  "footer":{"text":"If you don't accept/understand your warning, contact moderators on this channel, just ping them.\nTo cancel this warning use [Cancel]"
                
                }
              }
          ],content:"Connection terminated\n<@!"+target.id+">",components: [buttons]})
      })

      client.channels.cache.get(channels["modLog"]).send({embeds:[{
        "title":"New warning!",
        "description":"Executor: <@!"+executor.id+"> Target: <@!"+target.id+">",
        "color":"#FFCC00",
        "fields":[
          {
            "name":"Specified reason",
            "value":reason
          }
        ]
      }]})
    
}