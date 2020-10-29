const beautify = require('beautify');
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "eval",
  category: "Developer",
  description: "e",
  async run(bot, message, args) {
    if (
      ![
        "696084812112330783",
      ].includes(message.author.id)
    )
      return;
    if (args.length < 1) return message.channel.send("`Not enough parameters`");

    const client = message.client,
      options = {
        split: {
          char: "\n",
          prepend: "`" + "``js\n",
          append: "`" + "``",
        },
      };

    const match = args[0].match(/--(depth)=(\d+)/);
    const depth = match && match[1] === "depth" ? parseInt(match[2]) : 0;

    const content = args.join(" ");
    const result = new Promise((resolve) => resolve(eval(content)));

    return result
      .then((output) => {
        if (typeof output !== "string")
          output = require("util").inspect(output, { depth });
        if (output.includes(message.client.token))
          output = output.replace(
            message.client.token,
            "*You think I'm that retarted Zeekz? Or are you retarted? Please...say no...*"
          );
        const embed = new MessageEmbed()
          .setAuthor(
            "Evaluation",
            bot.user.displayAvatarURL()
          )
          .setTitle("Evaluation")
          .setColor("#41d0f2")
          .setDescription(
              "`" +
              "``js\n" +
              output +
              "`" +
              "``",
            options
          );
        message.channel.send(embed);
      })
      .catch((e) => {
        const embed1 = new MessageEmbed()
          .setTitle("Uhhh wot?")
          .setColor("#ff0000")
          .setDescription(`\`\`\`${e}\`\`\``)
        message.channel.send(embed1);

  },
)}}
