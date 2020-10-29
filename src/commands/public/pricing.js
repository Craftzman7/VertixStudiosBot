const { Discord, MessageEmbed } = require('discord.js')

module.exports = {
    name: "pricing",
    descripton: "Gets all current pricing",
    category: "info",
    run: async(bot, message, args) => {

        let embed1 = new MessageEmbed()
        .setAuthor("Vertx Studios Pricing - Menu", message.guild.iconURL())
        .setDescription("Here you can choose from different products from Discord Bots, to Graphic Designs.\nVisit our [website](https://vertixstudios.com) for more information.")
        .addField("Discord Bots", `\`v!pricing bot\``,true)
        .addField("GFX Designs", `\`v!pricing gfx\``, true)
        .addField("Payment Options", `[Paypal](https://paypal.me/zeekzatvertix) | [Patreon](https://www.patreon.com/vertixstudios)`, false)
        .setColor("#363940")

        if(args[0] == 'bot'){
        let embed2 = new MessageEmbed()
        .setAuthor("Vertx Studios Pricing - Discord Bots", message.guild.iconURL())
        .setDescription("\`$5 USD\`: Base Bot\n\`$3 USD\`: Economy\n\`$7 USD\`: Music\n\`$5 USD\`Moderation \n\`$3 USD\`Logging\n\`$7 USD\`: Role Management\n\`$7 USD\`: Leveling System\n\`$9 USD\`: Ticket System/Modmail System")
        .setColor("#363940")
        message.channel.send(embed2)
        }
    }
}