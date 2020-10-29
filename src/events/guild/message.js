const Timeout = new Set();
const {MessageEmbed} = require('discord.js')
const {prefix} = require('../../../config.json')
const ms = require('ms');

module.exports = async (bot, message) => {
   if(message.channel.type === "dm") return;

    if(message.channel.id == '755216386527199272' && message.author.bot){
        await message.react(`✅`)
        await message.react(`❌`)
    }

    if(message.channel.id == '770788596369457152' && message.content.includes !== 'v!new'){
        message.delete()
    }
    
    if(message.content.includes(`<@&739003811175334019>`)) {
        message.channel.send("Pls no chat ded, pls revive :c")
    }


    let user = message.member;
    if(message.author.bot) return;
    
    

    if (nwordArray.some(wo => ` ${message.content.toLowerCase()} `.includes(` ${wo} `))){
        if (message.guild.owner.id) return;
        if (message.member.hasPermission("ADMINISTRATOR")) return;
        if (!message.member.permissions.has(`MANAGE_MESSAGES`)){
            message.delete()
                
            user.send(`Woah there! That language is not tolerated in **Vertix Studios!**`)

            
            message.channel.send(`${user.user.toString(`${bot.users.cache.get(user.id).id}`)}, Woah there! That language is not tolerated in Vertix Studios`)  
            bot.channels.cache.get("734569935904440464").send(`[<#${message.channel.id}>] User: ${message.author} ${message.author.tag} (${message.author.id}) has used **filtered words (racial slurs)**. Automod has detected.`)
        }
    }


    if(arrayInvites.some(wor => ` ${message.content.toLowerCase()} `.includes(`${wor}`))){
        if (message.guild.owner.id) return;

        if (message.member.hasPermission("ADMINISTRATOR")) return;
        if (!message.member.permissions.has(`MANAGE_MESSAGES`)){
            if(message.channel.id === '692122514641518623') return;
            if(message.channel.id === '748681786250494022') return;
            if(message.channel.id === '688995274030710799') return;
            
            message.delete()

            user.send(`Stop sending invites in **Vertix Studios!**`)


            message.channel.send(`${user.user.toString(`${bot.users.cache.get(user.id).id}`)}, Server invites are not allowed! You will be muted if you continue.`)
            bot.channels.cache.get("734569935904440464").send(`[ <#${message.channel.id}> ] \`${message.content}\` | User: ${message.author} ${message.author.tag} (${message.author.id}) has used **Discord invite links**. Automod has detected.`)
        }
    }


    if(message.content.length >= 500){
        if (message.guild.owner.id) return;
        if (message.member.roles.cache.has("702375446171353159")) return;
        if(message.member.hasPermission("ADMINISTRATOR")) return;
        if (!message.member.permissions.has(`MANAGE_MESSAGES`)){
            if(message.channel.id === '692122514641518623') return;
            if(message.channel.id === '748681786250494022') return;
            if(message.channel.id === '688995274030710799') return;

            message.delete()

            user.send(`Woah there! Are you typing the bee movie script? Shorten your text in **Vertix Studios!**`)


            message.channel.send(`${user.user.toString(`${bot.users.cache.get(user.id).id}`)}, Stop spamming more than 500+ characters! Are you typing the Bee Movie Script or what? You will be muted if you continue.`)

            bot.channels.cache.get("734569935904440464").send(`[ <#${message.channel.id}> ] \`${message.content}\` | User: ${message.author} ${message.author.tag} (${message.author.id}) has used **500+ character limit (wall text)**. Automod has detected.`)
        }
    }



    ///////////////////////////// CALLING ALL STAFF FUNCTION ////////////////////////////////////////////////////////

    if(message.content.includes('<@&691355965911597108>')){
            message.reply(`\nDo you wish to **notify and ping __all__ staff?** Please use this for an emergency only.\n\nFalsy misuing this feature will get you warned and if continued a ban.\n\nIf you agree with this please reply with \`yes\`. To cancel this please reply with \`cancel\`. `)
            var Crole = message.guild.roles.cache.find(r => r.name === 'Called Staff');
            message.member.roles.add(Crole)
    }

        
    if(message.content === 'yes' && message.member.roles.cache.has("715460345715752991")){
            message.member.roles.remove("715460345715752991")            
            return message.channel.send(`<@&738596652268388464> requested by ${message.author}`)        
    }
    if(message.content === 'cancel' && message.member.roles.cache.has("715460345715752991")){
            message.member.roles.remove("715460345715752991")        
            return message.channel.send("Cancelled.")
    }

    
    //////////////////////// OTHER INFORMATION /////////////////////////////////////////////
   
    if (!message.content.toLowerCase().startsWith(prefix)) return;

    if(!message.member) message.member = await message.guild.fetchMember(message);
    if(!message.guild) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);


    //////////////////////// OTHER INFO/////////////////////////////////////////////////////////////////


    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;
    
    let command = bot.commands.get(cmd);
    if (!command) return;
    
    if (command) {
        if (command.timeout){
            if (Timeout.has(`${message.author.id}${command.name}`)) {
                return message.reply(`Slow down dude! You can use this command every ${ms(command.timeout)}!`)
            } else {
                 
                command.run(bot, message, args);
                Timeout.add(`${message.author.id}${command.name}`)
                setTimeout(() => {
                    Timeout.delete(`${message.author.id}${command.name}`)
                }, command.timeout);
            }
        } else {
            command.run(bot, message, args)
        }
    }
}