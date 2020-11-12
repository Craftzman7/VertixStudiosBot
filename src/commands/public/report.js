const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const config = require("../../../config.json")

module.exports = {
    name: "report",
    description: "Send a message to the developers about an issue.",
    category: "public",
    run: async(bot, message, args) => {
        const webhook = new Discord.WebhookClient(config.reportWebhookID, config.reportWebhookToken)

        let service = args[0]
        let issue = args.slice(1).join(" ")

        const embed = new MessageEmbed()
        .setTitle("Invalid Arguments")
        .setDescription("**Usage:** \`vps!report [service] [issue]\`\n\nService Options: \`bot\`, \`website\`, \`server\`, \`other\`,")
        .setColor("RED")

        if(!service) return message.channel.send(embed)
        if(!issue) return message.channel.send(embed)

        let channel = message.channel

        if(!message.guild.me.permissions.has("CREATE_INSTANT_INVITE")) return message.reply("I need the \`CREATE_INVITE\` permission so the developer can know which server you are in.")
        channel.createInvite({unique: true})
        .then(invite => {
            const embed = new MessageEmbed()
            .setTitle(`NEW REPORT: \`${service}\``)
            .addField(`Service:`, service)
            .addField(`Issue:`, issue)
            .addField(`User Information`, `User: ${message.author}\nTag: ${message.author.tag}\nID: ${message.author.id}`)
            .addField(`Server Info:`, `Server Name: ${message.guild.name}\nServer ID: ${message.guild.id}\nChannel Name: #${message.channel.name}\nChannel ID: ${message.channel.id}`)
            .addField(`Invite:`, `https://discord.gg/` + invite.code)
            .setColor("RED")
            .setTimestamp()
            webhook.send(embed)

            message.channel.send("I've informed the developers about your issue, please be patient as they may be busy.")

        })



       
    }
}
