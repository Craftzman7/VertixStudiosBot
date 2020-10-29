const {MessageEmbed} = require('discord.js')
const warns = require("../../database/warns")
const Discord = require('discord.js')
const config = require('../../../config.json')
const uniqid = require('uniqid');
const db = require('quick.db')
const action = 'kick';

module.exports={
    name: "kick",
    description: "Kick a specified user from the server",
    category:"moderation",
    run: async(bot,message,args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.delete()


        let user = message.guild.members.cache.get(args[0]) || message.mentions.users.first();
        let Reason = args.slice(1).join(" ");
        if (!user) return;
        if (!Reason) return;

        if (!user.kickable) return message.channel.send("That user cannot be kicked!")

        const caseID = db.get(`${message.guild.id}_caseID`)
        if(caseID === null) {
            db.set(`${message.guild.id}_caseID`, 1)
        } else {
        if(caseID === 1) {
                db.set(`${message.guild.id}_caseID`, 1)
        } else {
            db.add(`${message.guild.id}_caseID`, 1)
        }}

        user.kick({ reason: Reason })

        warns.findOne({User: user.id },async(err, data)=>{
            if(err) console.log(err)
            if(!data){
                let newWarns = new warns({
                    User: user.id,
                    Warns:[
                        {
                            Case: `#${caseID}`,
                            ID: ID = uniqid(),
                            Action: action,
                            Moderator: message.author.tag,
                            Reason: args.slice(1).join(" "),
                            Date: `${message.createdAt.toLocaleString()}`
                        }
                    ]
                })
                newWarns.save()

                const warnEmbed1 = new MessageEmbed()
                .setDescription(`<:check:755182390929915975> Case #${caseID} | \`kick\` for ${bot.users.cache.get(user.id).toString(`${bot.users.cache.get(user.id).id}`)} submitted with ID: \`${ID}\``)
                .setColor("#363940")
                message.channel.send(warnEmbed1)

            }else{
                data.Warns.unshift({
                Case: `#${caseID}`,
                ID: ID = uniqid(),
                Action: action,
                Moderator: message.author.tag,
                Reason: args.slice(1).join(" "),
                Date: `${message.createdAt.toLocaleString()}`
            })
            data.save()

            const warnEmbed2 = new MessageEmbed()
            .setDescription(`<:check:755182390929915975> Case #${caseID} | \`kick\` for ${bot.users.cache.get(user.id).toString(`${bot.users.cache.get(user.id).id}`)} submitted with ID: \`${ID}\``)
            .setColor("#363940")
            message.channel.send(warnEmbed2)

        const webhook = new Discord.WebhookClient(`${config.ModWebHookID}`, `${config.ModWebHookToken}`)
        const logEmbed = new MessageEmbed()
        .setAuthor(`Case ${caseID} | Kick | ${bot.users.cache.get(user.id).tag}`, bot.users.cache.get(user.id).displayAvatarURL())
        .setDescription(`**User:** ${bot.users.cache.get(user.id).tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
        .setFooter(`ID: ${ID}`)
        .setTimestamp()
        .setColor("#363940")
        webhook.send(logEmbed)

        const DMEmbed = new MessageEmbed()
        .setAuthor(`Case ${caseID} | Kick | Vertix Studios | ${bot.users.cache.get(user.id).tag} `, bot.user.displayAvatarURL())
        .setDescription(`You were kicked from Vertix Studios. Don't worry you can still join back. However, your chances of getting banned have increased. Be careful or else...`)
        .addField("Reason:", `${Reason}`)
        .addField("Appeal:", `Was this action unjustified? [Appeal Here](https://forms.gle/G9bGAC1JA1ZWcyjD8). Make sure to include the punishment ID: \`${ID}\`.`)
        .setColor("#363940")
        .setThumbnail(bot.user.displayAvatarURL())
        .setTimestamp()

        try {
            user.send(DMEmbed)
        } catch(err) {
            console.warn(err)
        }
    }
})}}
