const {MessageEmbed} = require('discord.js');
const warns = require("../../database/warns")
const db = require('quick.db')
const config = require('../../../config.json')
const Discord = require('discord.js')
const uniqid = require('uniqid');
let action = 'warn';
let ID = uniqid()

module.exports={
    name: 'warn',
    description: "warn a user for a rule break.",
    category: "mod",
    usage: "<User id> <Reason>",
    run: async(bot,message,args) =>{
        
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.delete()

        message.delete()

        const caseID = db.get(`${message.guild.id}_caseID`)
        if(caseID === null) {
            db.set(`${message.guild.id}_caseID`, 1)
        } else {
        if(caseID === 1) {
                db.add(`${message.guild.id}_caseID`, 1)
        } else {
            db.add(`${message.guild.id}_caseID`, 1)
        }

        

        let user = message.guild.members.cache.get(args[0]) || message.mentions.users.first();
        if (!user) return;
        let reason = args.slice(1).join(" ")
        if (!reason) return;
        
        warns.findOne({User: user.id },async(err, data)=>{
            if(err) console.log(err)
            if(!data){
                let newWarns = new warns({
                    User: user.id,
                    Warns:[
                        {
                            Case: `#${caseID}`,
                            ID: ID,
                            Action: action,
                            Moderator: message.author.tag,
                            Reason: args.slice(1).join(" "),
                            Date: message.createdAt.toLocaleString()
                        }
                    ]
                })
                newWarns.save()

                const warnEmbed1 = new MessageEmbed()
                .setDescription(`**Case #${caseID}** | \`warn\` for ${bot.users.cache.get(user.id).toString(`${bot.users.cache.get(user.id).id}`)} submitted with ID: \`${ID}\``)
                .setColor("#363940")
                message.channel.send(warnEmbed1)

            }else{
                data.Warns.unshift({
                    Case: `#${caseID}`,
                    ID: ID,
                    Action: action,
                    Moderator: message.author.tag,
                    Reason: args.slice(1).join(" "),
                    Date: message.createdAt.toLocaleString()
                })
                data.save()

                const warnEmbed2 = new MessageEmbed()
                .setDescription(`**Case #${caseID}** | \`warn\` for ${bot.users.cache.get(user.id).toString(`${bot.users.cache.get(user.id).id}`)} submitted with ID: \`${ID}\``)
                .setColor("#363940")
                message.channel.send(warnEmbed2)


            }
        })
        const webhook = new Discord.WebhookClient(`${config.ModWebHookID}`, `${config.ModWebHookToken}`)
        const logEmbed = new MessageEmbed()
        .setAuthor(`Case #${caseID} | Warn | ${bot.users.cache.get(user.id).tag}`, bot.users.cache.get(user.id).displayAvatarURL())
        .setDescription(`**User:** ${bot.users.cache.get(user.id).tag} (${bot.users.cache.get(user.id).id})\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
        .setFooter(`ID: ${ID}`)
        .setColor("#363940")
        .setTimestamp()
        webhook.send(logEmbed)



        //dm embed
        const DMEmbed = new MessageEmbed()
        .setAuthor(`Case #${caseID} | Warn | Vertix Studios | ${bot.users.cache.get(user.id).tag}`, bot.user.displayAvatarURL())
        .setDescription(`You have received a warning from Vertix Studios moderation.`)
        .addField("Reason:", args.slice(1).join(" "))
        .addField("Appeal:", `Was this action unjustified? [Appeal Here](https://forms.gle/G9bGAC1JA1ZWcyjD8). Make sure to include the punishment ID: \`${ID}\`.`)

        .setColor("#363940")

        .setTimestamp()

        try {
            user.send(DMEmbed)
        } catch(err) {
            console.warn(err)
        }
    
    }
}}