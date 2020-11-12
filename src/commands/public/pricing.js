const { Discord, MessageEmbed } = require('discord.js')

module.exports = {
    name: "pricing",
    descripton: "Gets all current pricing",
    category: "public",
    run: async(bot, message, args) => {

        let embed1 = new MessageEmbed()
        .setAuthor("Vertx Studios Pricing - Menu", message.guild.iconURL())
        .setDescription("Here you can choose from different products from Discord Bots, to Graphic Designs.")
        .addField("Discord Bots", `\`v!pricing bot\``,true)
        .addField("Payment Options", `[Paypal](https://paypal.me/zeekzatvertix)`, false)
        .setColor("#363940")

        if(args[0] == 'bot'){
        let embed2 = new MessageEmbed()
        .setAuthor("Vertx Studios Pricing - Discord Bots", message.guild.iconURL())
        .setDescription(`**($7) Support**\nThis package includes commands that is used for a support system, custom tickets, assign support roles to users. Support easy and fast in your server.\n\n**($14) Economy**\nThis package will include commands such as \`balance\`, \`beg\`, \`store\` and much more. Gamble your life savings with a customizable economy shop, with optional role rewards and income.\n\n**($15) Moderation**\nThis package will include commands such as \`warn\`, \`mute\`, \`kick\` and much more. Help protect your server from raids, users that break rules, and punish them with the correct action.\n\n**($19) Logging**\nThis package does not include any commands but will log actions to a specific chanel in your server such as a \`join\`, \`leave\` and much more.\n\n**($25) Multi-Bot**\nThis package includes everything from \`Fun & Games\`, \`Economy\`, \`Moderation\`, and \`Logging\`. Have everything customized in to your server. The only bot you will need.\n\n\n**Ready to Order?**\nRun the command: \`vsp!order [package]\` and then join our [Discord erver](https://discord.gg/TwmdQyK). After submitting your order you will receive an DM from one of the developers. The bot will not be created until it has been paid.`)
        .setColor("#363940")
            message.channel.send(embed2)
        }

        if(!args[0]) return message.channel.send(embed1)
    }
}
