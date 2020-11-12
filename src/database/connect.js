const chalk = require('chalk')
const mongoose = require('mongoose')
const config = require("../../config.json")
const Discord = require('discord.js')
async function connect() {
    console.log("Connecting to the database...")
    await mongoose.connect(config.Mongo,{ 
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    var d = new Date()
    const Webhook = new Discord.WebhookClient(config.connectWebhookID, config.connectWebhookToken)
    Webhook.send(`[\`${d.toLocaleDateString()}\`] [\`${d.toLocaleTimeString()}\`] **[CONNECTED]** Successfully loaded all commands & connected to database!`)
    console.log(chalk.green(`[${d.toLocaleDateString()}] [${d.toLocaleTimeString()}]`), chalk.cyan(`[CONNECTED]`), chalk.white(`Successfully connected to MongoDB cluster.`))
    console.log(" ")
}

module.exports = connect()