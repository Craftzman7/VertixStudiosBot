const {MessageEmbed} = require('discord.js')
const warns = require("../../database/warns")
const config = require('../../../config.json')
const db = require('quick.db')
const uniqid = require('uniqid');
const action = 'ban';

module.exports = {
    name: "ban",
    description: "Ban a user from the guild",
    category: "mod",
    run: async(bot,message,args)=>{
      if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.delete()


        let user = message.guild.members.cache.get(args[0]) || message.mentions.users.first();
        let Reason = args.slice(1).join(" ");
        if (!user) return;
        if (!Reason) return;

        if(!user.bannable) return;

        user.ban({ reason: Reason })

        const caseID = db.get(`${message.guild.id}_caseID`)
        if(caseID === null) {
            db.set(`${message.guild.id}_caseID`, 1)
        } else {
        if(caseID === 1) {
                db.set(`${message.guild.id}_caseID`, 1)
        } else {
            db.add(`${message.guild.id}_caseID`, 1)
        }}

        let ID = uniqid()


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
                            Date: `${message.createdAt.toLocaleString()}`
                        }
                    ]
                })
                newWarns.save()
        
                // Replying with an embed.
                const warnEmbed1 = new MessageEmbed()
                .setDescription(`<:check:755182390929915975> Case #${caseID} | \`mute\` for ${bot.users.cache.get(user.id).toString(`${bot.users.cache.get(user.id).id}`)} submitted with ID: \`${ID}\``)
                .setColor("#363940")
            message.channel.send(warnEmbed1)

            } else {
                data.Warns.unshift({
                Case: `#${caseID}`,
                ID: ID,
                Action: action,
                Moderator: message.author.tag,
                Reason: args.slice(1).join(" "),
                Date: `${message.createdAt.toLocaleString()}`
            })
            data.save()
        
        // Replying with an embed.
        const warnEmbed2 = new MessageEmbed()
        .setDescription(`<:check:755182390929915975> Case #${caseID} | \`mute\` for ${bot.users.cache.get(user.id).toString(`${bot.users.cache.get(user.id).id}`)} submitted with ID: \`${ID}\``)
        .setColor("#363940")
        message.channel.send(warnEmbed2)

        const webhook = new Discord.WebhookClient(`${config.ModWebHookID}`, `${config.ModWebHookToken}`)

        const logEmbed = new MessageEmbed()
        .setAuthor(`Case ${caseID} | Ban | ${bot.users.cache.get(user.id).tag}`, bot.users.cache.get(user.id).displayAvatarURL())
        .setDescription(`**User:** ${bot.users.cache.get(user.id).tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
        .setFooter(`ID: ${ID}`)
        .setTimestamp()
        .setColor("#363940")
        webhook.send(logEmbed)

        //DM embed
        const DMEmbed = new MessageEmbed()
        .setAuthor(`Case ${caseID} | Case ${caseID}Ban | Vertix Studios | ${bot.users.cache.get(user.id).tag} `, bot.user.displayAvatarURL())
        .setDescription(`You were banned from Vertix Studios.`)
        .addField("Reason:", `${Reason}`)
        .addField("Appeal:", `Was this action unjustified? [Appeal Here](https://forms.gle/G9bGAC1JA1ZWcyjD8). Make sure to include the punishment ID: \`${ID}\`.`)
        .setColor(`#fc0b03`)
        .setTimestamp()

        try {
            user.send(DMEmbed)
        } catch(err) {
            console.warn(err)
        }
    }}
)}}
