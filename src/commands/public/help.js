const { Discord, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: "help",
    descripton: "Gets all commands",
    category: "info",
    run: async(bot, message, args) => {

        let user = message.author 

        let role = db.fetch(`role_${user.id}`)
        if (role == null) role = 'Member'

        const embed = new MessageEmbed()
        .setTitle("Vertix Studios - Public Commands")
        .addField("Your access level:", role)
        .setDescription(`\`ping\` - View bot's latency.\n\`uptime\` - View bot's uptime.\n\`bots\` - View client's bots information.\n\`pricing\` - View our current pricing.\n\`profile\` - View your current profile.\n\`new\` - Start a new ticket thread.`)
        .setColor("#363940")
    
        message.channel.send(embed)
    }
}