let db = require('quick.db')
let mongoose = require('mongoose')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "profile",
    descripton: "View your current profile",
    category: "info",
    run: async(bot, message, args) => {

        blacklist = await db.fetch(`${message.author.id}_blacklist`)
        if (blacklist === "Blacklisted") return message.channel.send(`Big oofers ${message.author}, you are blacklisted from using this bot.`)

        let user = message.mentions.users.first() || message.author;

        if (user.bot) {
            let botEmbed = new MessageEmbed()
            .setAuthor(`Profile: ${bot.users.cache.get(user.id).tag}`, bot.users.cache.get(user.id).displayAvatarURL())
            .setThumbnail(bot.users.cache.get(user.id).displayAvatarURL())
            .setColor("RANDOM")
            .addField(`Role:`, `Bot`)
            .addField("Bot Info:", `Username: ${bot.users.cache.get(user.id).username}\nID: ${bot.users.cache.get(user.id).id}` )
            return message.channel.send(botEmbed)

        } else {

        let commandsUsed = db.fetch(`commands_${user.id}`)
        if (commandsUsed == null) commandsUsed = 0;


        let role = db.fetch(`role_${user.id}`)
        if (role == null) role = 'Member'



        let moneyEmbed = new MessageEmbed()
        .setAuthor(`Profile: ${bot.users.cache.get(user.id).tag}`, bot.users.cache.get(user.id).displayAvatarURL())
        .setThumbnail(bot.users.cache.get(user.id).displayAvatarURL())
        .setColor("RANDOM")
        .addField(`Role:`, role)
        .addField("Stats:", `Command Used: ${commandsUsed}`)
        .addField("Member Info:", `Username: ${bot.users.cache.get(user.id).username}\nID: ${bot.users.cache.get(user.id).id}` )

        message.channel.send(moneyEmbed)
    }}
}