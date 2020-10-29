const mongoose = require('mongoose')
const { MessageEmbed } = require('discord.js')
const warns = require("../../database/warns")
const Discord = require('discord.js')

module.exports={
    name: 'rmpunish',
    description: "delete active warnings.",
    category: "mod",
    run: async(bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.delete()

        let user = message.guild.members.cache.get(args[0])

        if (!user){
            const embed2 = new Discord.MessageEmbed()
            .setTitle("Error Missing Parameters")
            .setDescription("No user was given or found.\n**Usage:** \`>rmpunish [id]\`")
            return message.channel.send(embed2)
        }
        warns.findOneAndDelete({
            User: user.id
        }, (err, res) => {
            if(err) console.log(err)
            const embed = new MessageEmbed()
            .setDescription(`<:check:755182390929915975> Punishment(s) for ${bot.users.cache.get(user.id).toString(`${bot.users.cache.get(user.id).id}`)} **removed** successfully.`)
            .setColor("#363940")
            message.channel.send(embed)

        })
    }
}