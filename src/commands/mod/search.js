const warns = require("../../database/warns")
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "search",
    description: "view current active warnings.",
    category: "mod",
    run: async (bot, message, args) => {
        let user = message.guild.members.cache.get(args[0]) || message.mentions.users.first()
        if (!user) return;
        warns.find(
        { User: user.id },
        async (err, data) => {
                if (err) console.log(err);
                if (!data.length)
                return message.channel.send(
                `No infractions found for **${user.tag}**.`
          );
        let Embed = new MessageEmbed();
        Embed.setDescription(`All Punishments for ${bot.users.cache.get(user.id).toString(`${bot.users.cache.get(user.id).id}`)}`)
        data.map(d=>{
            d.Warns.map((w,i)=>Embed.addField(`Case: ${w.Case} | ID: ${w.ID}`, `**\`${w.Action}\`** - ${w.Reason}\nOn: ${w.Date}\nBy: ${w.Moderator}`))
        })
        Embed.setAuthor(`${user.user.tag}`, user.user.displayAvatarURL())
        Embed.setColor("RANDOM")
        message.channel.send(Embed);
      });
    }
}

