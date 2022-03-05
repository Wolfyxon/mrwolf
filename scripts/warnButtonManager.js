	switch (interaction.customId) {
		case "warning_accept":
			if (interaction.message.mentions.users.first().id == interaction.user.id) {
				const buttons = new MessageActionRow()
					.addComponents(
						new MessageButton()
							.setCustomId('disabled')
							.setLabel('ACCEPTED')
							.setStyle('SUCCESS')
							.setDisabled(true),
					);

				interaction.message.edit({ content: interaction.message.content, embeds: interaction.message.embeds, components: [buttons] });
				interaction.reply("**Warning has been accepted! Thank you**\nDeleting this channel and restoring access and in 5s");
				client.channels.cache.get(channels["modLog"]).send({embeds:[{
					"title":"Warning accepted",
					"description":"<@!"+interaction.member.id+"> has accepted his warning",
					"color":"#CCCC00"
				}]})

				setTimeout(function () {
					interaction.member.roles.remove(roles["warnBlock"])
					interaction.channel.delete();
				}, 5000)
			}
			else {
				interaction.reply({ content: "You cannot accept someone else's warning!", ephemeral: true });
			}
			break;
		case "warning_decline":
			if(interaction.member.roles.cache.has(roles["staff"])){
				if(interaction.member.id != interaction.message.mentions.users.first()){
					const buttons = new MessageActionRow()
					.addComponents(
						new MessageButton()
							.setCustomId('disabled')
							.setLabel('Warning cancelled')
							.setStyle('SUCCESS')
							.setDisabled(true),
					);
						
					interaction.message.edit({ content: interaction.message.content, embeds: interaction.message.embeds, components: [buttons] });
					interaction.reply("<@"+interaction.member.id+"> has cancelled your warning.\nDeleting this channel and restoring access in 5s");
					setTimeout(function () {
						client.channels.cache.get(channels["modLog"]).send({embeds:[{
							"title":"Warning cancelled",
							"description":"<@!"+interaction.member.id+"> has cancelled <@!"+interaction.message.mentions.users.first().id+">'s warning",
							"color":"#0099FF"
						}]})
						interaction.guild.members.cache.get(interaction.message.mentions.users.first().id).roles.remove(roles["warnBlock"]);
						setTimeout(function(){interaction.channel.delete()},100);
						
					}, 5000)
				}
				interaction.reply({ content: "You cannot cancel your own warning!", ephemeral: true });
			}
			else {
				interaction.reply({ content: "Only staff can cancel your warning", ephemeral: true });
			}
		break;
	}