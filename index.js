const Discord = require("discord.js");
const {MessageEmbed} = require('discord.js');
const fs = require("fs");
const config = require('./config.json')
const prefix = config.prefix;
const mongoose = require('mongoose');
const chalk = require('chalk')
const bot = new Discord.Client({disableMentions:'everyone'});

bot.prefix = prefix;
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

bot.models = { user: require('./src/database/models/user.js') }
require('./src/database/connect')


bot.categories = fs.readdirSync("./src/commands");
["command"].forEach(handler => {
    require(`./src/handlers/${handler}`)(bot);
});


bot.on("ready", (bot) => {
     var da = new Date()
    const Webhook = new Discord.WebhookClient(config.readyWebhookID, config.readyWebhookToken)
    Webhook.send(`[\`${da.toLocaleDateString()}\`] [\`${da.toLocaleTimeString()}\`] **[ONLINE]** Vertix Studios reported online!`)
  require('./src/events/client/ready')
});

bot.on("message", async (message) => {
    require("./src/events/guild/message")(bot, message);
});

bot.on("guildMemberAdd", async (member) => {
    var d = new Date()
    bot.channels.cache.get("776334966241624084").send(`[\`${d.toLocaleTimeString()}\`] 📥 ${member.user.tag} (\`${member.id}\`) joined the server, account created \`${member.user.createdAt.toLocaleString()}\`.`)
    
});

bot.on("guildMemberRemove", async (member) => {
    var d = new Date()
    bot.channels.cache.get("776334966241624084").send(`[\`${d.toLocaleTimeString()}\`] 📤 ${member.user.tag} (\`${member.id}\`) left the server, joined on \`${member.joinedAt.toLocaleDateString()}\`.`)
});

bot.login(config.Token)
