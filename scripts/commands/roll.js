var min = interaction.options.getInteger('minimum');
var max = interaction.options.getInteger('maximum');

if(!min){min = 1};
if(!max){max = 6};




if((min < 1000000000001 && min > -1000000000001) && (max < 1000000000001 && max > -1000000000001)){
interaction.deferReply()
setTimeout(function(){
    var randomResponses = ["Oh crap, dice fell from the table,","Got it","Result: ","return ","It's ","I see "]
    var number = random(min,max)
    var strNumber = replaceAll(String(number),"1",":one:")
    strNumber = replaceAll(strNumber,"2",":two:")
    strNumber = replaceAll(strNumber,"3",":three:")
    strNumber = replaceAll(strNumber,"4",":four:")
    strNumber = replaceAll(strNumber,"5",":five:")
    strNumber = replaceAll(strNumber,"6",":six:")
    strNumber = replaceAll(strNumber,"7",":seven:")
    strNumber = replaceAll(strNumber,"8",":eight:")
    strNumber = replaceAll(strNumber,"9",":nine:")
    strNumber = replaceAll(strNumber,"0",":zero:")

    interaction.editReply(randomResponses[random(0,randomResponses.length-1)]+" "+strNumber)
},1000)
}
else {
    interaction.reply({ content: "Bro, it's too much", ephemeral: true });
}
