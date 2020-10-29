const config = require("./config.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const { MessageEmbed } = require('discord.js');
const fs = require("fs");
const mongoose = require('mongoose')
const prefix = config.prefix
const db = require('quick.db')
const Streamrole = require('discord-streamrole')
const tic = require('discord-tictactoe')

bot.prefix = prefix;
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

mongoose.connect(config.Mongo,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

const TempChannels = require("discord-temp-channels");
const tempChannels = new TempChannels(bot);
 
// Register a new main channel
tempChannels.registerChannel("769086230297182218", {
    childCategory: "769087206483820555",
    childAutoDeleteIfEmpty: true,
    childAutoDeleteIfOwnerLeaves: true,
    childBitrate: 64000,
    childMaxUsers: 25,
    childFormat: (member, count) => `🔒 ${member.user.username}'s Lounge`
});

bot.categories = fs.readdirSync("./src/commands/");
["command"].forEach(handler => {
    require(`./src/handlers/${handler}`)(bot);
});

bot.on("ready", () => {
  function randomStatus() {
    let Playstatus = [`Vertix Studios`]
    let Pstatus = Math.floor(Math.random() * Playstatus.length);
    
    bot.user.setActivity(Playstatus[Pstatus], {type: "WATCHING",});
  }; setInterval(randomStatus, 12000) // Time in ms. 30000ms = 30 seconds. Min: 20 seconds, to avoid ratelimit.

  console.log(`Vertix Studioss is now online on ${bot.guilds.cache.size} servers watching ${bot.users.cache.size} users`)

});

Streamrole(bot, {
    live: "🎥Streaming",
    event: true,
    console: true
});

new tic({
  language: 'en',
  command: '.ttt'
}, bot);

bot.on("message", async (message) => {
  require("./src/events/guild/message")(bot, message);
});

bot.on("guildMemberAdd", member => {

  let welcomeEmbed = new MessageEmbed()
  .setAuthor(`${member.user.tag} has just landed!`, member.user.displayAvatarURL())
  .setDescription(`Welcome to our server ${bot.users.cache.get(member.id).toString(`${bot.users.cache.get(member.id).id}`)}. Enjoy your stay!`)
  .setFooter(`Member: #${member.guild.memberCount} | Account Created ${member.user.createdAt.toLocaleString()}`, member.guild.iconURL())
  .setColor('367fdd')

  bot.channels.cache.get('692102883923066890').send(`<@&736071720427061298>`, welcomeEmbed)
})

bot.login(config.Token)