module.exports = {
    name: "docs",
    description: "Gets the policy websites.",
    category: "public",
    run: async(bot, message, args) => {
        message.channel.send("To view our Privacy & Return Policy, Terms of Service, visit our website here: https://policies.vertixstudios.com")
    }

}