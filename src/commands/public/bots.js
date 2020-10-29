const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');

module.exports = { 
    name: 'bots',
    description: "Fetches bot data and client.",
    category: "info/bot",
    run: async(bot, message, args) => { 

        let userBot = message.guild.members.cache.get(args[0]);

            let mainEmbed = new MessageEmbed()
            .setTitle("Bots - Menu")
            .addField("Echo's Utilities#3343", "\`v!bots 752320040144994417\`")
            .addField("Limited's Utilities#1034", "\`v!bots 754746925995262103\`")
            .setColor("#363940")

        if(!userBot) return message.channel.send(mainEmbed)


            let echoEmbed = new MessageEmbed()
            .setTitle("Bot - Echo's Utilities#3343")
            .addField("Client:", `<@530408255885934612> (530408255885934612)`)
            .addField("Bot Server:", "[Echo's Circle](https://discord.gg/xrj3pEU)")
            .addField("Created At", "9/7/2020, 12:11:15 AM")
            .setColor("#363940")

            let soloEmbed = new MessageEmbed()
            .setTitle("Bot - Limited's Utilities#1034")
            .addField("Client:", `<@657573848295931904> (657573848295931904)`)
            .addField("Bot Server:", "[Limited World](https://discord.gg/aUfsp2v)")
            .addField("Created At", "9/13/2020, 4:54:49 PM")
            .setColor("#363940")
            
            if(args[0] == '752320040144994417'){
                return message.channel.send(echoEmbed)
            } else {

            if(args[0] == '754746925995262103'){
                return message.channel.send(soloEmbed)
            }
        }
    

    }
}