const { Discord, MessageEmbed } = require('discord.js')
module.exports = {
    name: "ping",
    descripton: "Gets bots latency.",
    category: "info",
    run: async(bot, message, args)=>{ 

        message.channel.send(`🏓 Pinging....`).then(msg=>{
             
        msg.edit(`Pong! \`${Math.floor(msg.createdTimestamp - message.createdTimestamp)}\`ms. Message Edit: \`${Math.round(bot.ws.ping)}\`ms`);
    })
    }
}
//Pong ping !!!
