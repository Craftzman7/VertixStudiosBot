module.exports={
    name: "slowmode",
    category:"modertation",
    description:"Set the slowmode for the channel!",
    run: async(bot, message, args)=>{
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply('lol...no')

        if (!args[0]) return message.channel.send(`The current slowmode is **${rateLimitPerUser}**`)
        if(isNaN(args[0]))return message.channel.send(`That is not a number!`)
        message.channel.setRateLimitPerUser(args[0])
        message.channel.send(`Set the slowmode to \`${args[0]}\``)
    }
}
