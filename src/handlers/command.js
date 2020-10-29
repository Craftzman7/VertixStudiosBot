const { readdirSync } = require("fs");
module.exports = (client) => {
    readdirSync("./src/commands/").map(dir => {
       const commands = readdirSync(`./src/commands/${dir}/`).map(cmd=>{
           let pull = require(`../commands/${dir}/${cmd}`)
           console.log(`✔️  Loaded...${pull.name}`)
           client.commands.set(pull.name,pull)
           if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
       })
    })
}