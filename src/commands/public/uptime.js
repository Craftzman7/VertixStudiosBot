const { Discord, MessageEmbed } = require('discord.js')

module.exports={
  name: 'uptime',
  descripton: "Fetches uptime for the bot",
  category: "info",
  run: async(bot, message, args)=>{ 

    function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds, `
    }

    const embed = new Discord.MessageEmbed()
    .setAuthor(`${duration(bot.uptime)}`, bot.user.displayAvatarURL())
    .setColor("#4a9cff")
    message.channel.send(embed)

}}
