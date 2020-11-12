const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const config = require("../../../config.json")

module.exports = {
    name: "order",
    description: "Order a custom bot from Vertix.",
    category: "public",
    timeout: 9000,
    run: async(bot, message, args) => {

        const webhook = new Discord.WebhookClient(config.orderWebhookID, config.orderWebhookToken)

        let package = args[0]
        let channel = message.channel

        const uniqid = require('uniqid');
        let ID = uniqid()

        let embed1 = new MessageEmbed()
        .setAuthor("Vertx Studios Pricing - Bots - Packages", message.guild.iconURL())
        .setDescription("That's an invalid package, view all the packages here.")
        .addField("Packages", `\`support\`, \`fun\`, \`economy\`, \`moderation\`, \`logging\`, \`all\``)
        .setColor("#363940")

        if(!args[0]) return message.channel.send(embed1)

        if(args[0] == 'support'){
           
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Only server administrators can use this command.")

            if(!message.guild.me.permissions.has("CREATE_INSTANT_INVITE")) return message.reply("I need the \`CREATE_INVITE\` permission so the developer can know which server you are in.")
            channel.createInvite({unique: true})
            .then(invite => {
                const embed = new MessageEmbed()
                .setTitle(`NEW ORDER: \`${ID}\``)
                .addField(`Package:`, package)
                .addField(`User Information`, `User: ${message.author}\nTag: ${message.author.tag}\nID: ${message.author.id}`, true)
                .addField(`Server Info:`, `Server Name: ${message.guild.name}\nServer ID: ${message.guild.id}`, true)
                .addField(`Invite:`, `https://discord.gg/` + invite.code)
                .setColor("RED")
                .setTimestamp()
                webhook.send(embed)
    
                message.channel.send('Order has been submitted!')
            })
        }
    }
}
