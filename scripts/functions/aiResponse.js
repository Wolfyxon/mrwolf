function isInsult(message) {
    if(random(0,15) == 0){
    var insults = ["bad", "sucks", "useless"]

    if (message.content.toLowerCase().includes("mrwolf") || message.content.toLowerCase().includes("mr wolf") || message.content.toLowerCase().includes("ur bot") || message.content.toLowerCase().includes("your bot") || message.content.toLowerCase().includes("mr.wolf") || message.content.toLowerCase().includes("mr. wolf"))
        for (var i = 0; i < insults.length; i++) {
            if (message.content.toLowerCase().includes(insults[i])) {
                var responses =require("./data/randomResponses/insultResponses.json")
                var response = responses[random(0, responses.length-1)]
                
                if(!response.includes("https://")){message.channel.sendTyping()
                var sendTypingInterval = setInterval(function(){message.channel.sendTyping()},3000)
            }
                setTimeout(function () {
                    clearInterval(sendTypingInterval)
                    if(!response.includes("https://")){message.channel.sendTyping()}
                    message.reply(response)
                },random(2,response.length)*200)
                break;
            }
        }
    }
}