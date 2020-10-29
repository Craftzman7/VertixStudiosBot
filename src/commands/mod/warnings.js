const warns = require("../../database/warns")
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "warnings",
    description: "view your current active warnings.",
    category: "mod",
    run: async (bot, message, args) => {
        let user = message.member
        warns.find(
        { User: user.id },
        async (err, data) => {
                if (err) console.log(err);
                if (!data.length)
                return message.channel.send(
                `Good Job! You have no warnings!`
          );
        let Embed = new MessageEmbed();
        Embed.setDescription(`All Punishments for ${user.user.toString(`${bot.users.cache.get(user.id).id}`)}`)
        data.map(d=>{
            d.Warns.map((w,i)=>Embed.addField(`Case: ${w.Case} | ID: ${w.ID} `, `**\`${w.Action}\`** - ${w.Reason}\nOn: ${w.Date}`))
        })
        Embed.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        Embed.setColor("RANDOM")
        message.channel.send(Embed);
      }
    );
  },
};