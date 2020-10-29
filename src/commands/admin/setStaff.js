const Discord = require("discord.js")
const db = require('quick.db')

module.exports={
    name: 'setstaff',
    descripton: "Set a staff member in the database",
    category: "info",
    run: async(bot, message, args)=>{ 
    
    let user = message.guild.members.cache.get(args[0]) || message.mentions.users.first();
    if(!user) return;

        let role = db.fetch(`role_${user.id}`)
        let roleName = args.slice(1).join(" ")

        if(args[1] == 'staff') roleName = '🛠 Vertix Staff'
        if(args[1] == 'mod') roleName = '🛠 Server Staff'
        if(args[1] == 'admin') roleName = '🛠 Vertix Admin'
        if(args[1] == 'member') roleName = 'Member'
    
    if(role === null) {
        db.set(`role_${user.id}`, roleName)
        message.channel.send(`Done.`)
    } else {
        db.set(`role_${user.id}`, roleName)
        message.channel.send(`Done.`)



    }}
}
