const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
let ms = require('ms')
const warns = require("../../database/warns")
const db = require('quick.db')
const warns = require('../../database/warns')
const action = 'mute';
const uniqid = require('uniqid');
const config = require('../../../config.json')

module.exports = {
    name: "mute",
    description: "supress a user from speaking in channels.",
    category: "mod",
    run: async(bot, message, args) =>{
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.delete()

        let user =  message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        if (!user) return;
        
        let member;

        try {
            member = await message.guild.members.fetch(user);
        } catch(err) {
            member = null;
        }

        if (!member) return;

        let rawTime = args[1];
        let time = ms(rawTime);
        if (!time) return;


        let reason = args.splice(2).join(' ');
        if(!reason) return;

        let ID = uniqid()

        const caseID = db.get(`${message.guild.id}_caseID`)
        if(caseID === null) {
            db.set(`${message.guild.id}_caseID`, 1)
        } else {
        if(caseID === 1) {
                db.set(`${message.guild.id}_caseID`, 1)
        } else {
            db.add(`${message.guild.id}_caseID`, 1)
        }}

        const DMEmbed = new MessageEmbed()
        .setAuthor(`Case ${caseID} | Mute | Vertix Studios | ${bot.users.cache.get(user.id).tag} `, bot.user.displayAvatarURL())
        .setDescription(`You have received a mute for ${rawTime} in Vertix Studios. Please note that your chances of getting kicked or ban have increased. Be careful or else...`)
        .addField("Expires:", rawTime)
        .addField("Appeal:", `Was this action unjustified? [Appeal Here](https://forms.gle/G9bGAC1JA1ZWcyjD8). Make sure to include the punishment ID: \`${ID}\`.`)
        .setColor("#363940")
        .addField("Reason:", args.slice(1).join(" "))
        .setTimestamp()

        try {
            user.send(DMEmbed)
        } catch(err) {
            console.warn(err)
        }
        
        let role = message.guild.roles.cache.find(r => r.name === 'Muted');

        member.roles.add(role)

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
                            Reason: reason,
                            Date: `${message.createdAt.toLocaleString()}`
                        }
                    ]
                })
                newWarns.save()

                const warnEmbed1 = new MessageEmbed()
                .setDescription(`<:check:755182390929915975> Case #${caseID} | \`mute\` for ${bot.users.cache.get(user.id).toString(`${bot.users.cache.get(user.id).id}`)} submitted with ID: \`${ID}\``)
                .setColor("#363940")
                message.channel.send(warnEmbed1)

            }else{
                data.Warns.unshift({
                    Case: `#${caseID}`,
                    ID: ID,
                    Action: action,
                    Moderator: message.author.tag,
                    Reason: reason,
                    Date: `${message.createdAt.toLocaleString()}`
                    
                })
                data.save()

                const warnEmbed2 = new MessageEmbed()
                .setDescription(`<:check:755182390929915975> Case #${caseID} | \`mute\` for ${bot.users.cache.get(user.id).toString(`${bot.users.cache.get(user.id).id}`)} submitted with ID: \`${ID}\``)
                .setColor("#363940")
                message.channel.send(warnEmbed2)

            }
        })

        const webhook = new Discord.WebhookClient(`${config.ModWebHookID}`, `${config.ModWebHookToken}`)
        const logEmbed = new MessageEmbed()
        .setAuthor(`Case ${caseID} | Mute | ${bot.users.cache.get(user.id).tag}`, bot.users.cache.get(user.id).displayAvatarURL())
        .setDescription(`**User:** ${bot.users.cache.get(user.id).tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
        .setFooter(`ID: ${ID}`)
        .setTimestamp()
        .setColor("#363940")

        webhook.send(logEmbed)
        
        setTimeout(async() =>{
            member.roles.remove(role);
        }, time)


    }
}