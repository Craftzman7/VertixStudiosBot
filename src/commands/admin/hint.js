const { MessageEmbed } = require('discord.js')


module.exports={
    name: 'hint',
    descripton: "Send a error message to a channel",
    category: "admin",
    run: async(bot, message, args) => {
        message.delete();

        // Defining 

        let reason =  args.slice(2).join(' ');

        // Images

        let infoImage = '<:info:771244437266759720>';
        let successImage = '<:checkmark:771244437174747166>';
        let warningYImage = '<:yellowwarning:771244436792279051>';
        let warningRImage = '<:redwarning:771244437103050752> ';

        // Colors

        let infoColor = '#3884FF';
        let successColor = '#26CB7C';
        let warningYColor = '#F77D05';
        let warningRColor = '#FF4642';


        // Message Embeds

        const infoMessage = new MessageEmbed()
        .setDescription(`${infoImage}, ${reason}`)
        .setColor(infoColor)

        const successMessage = new MessageEmbed()
        .setDescription(`${successImage}, ${reason}`)
        .setColor(successColor)

        const warningYellowMessage = new MessageEmbed()
        .setDescription(`${warningYImage}, ${reason}`)
        .setColor(warningYColor)

        const warningRMessage = new MessageEmbed()
        .setDescription(`${warningRImage}, ${reason}`)
        .setColor(warningRColor)


        // Arguments

        if(args[1] === 'info') {
            return message.channel.send(infoMessage)
        };
        if(args[1] === 'success') { 
            return message.channel.send(successMessage)
        };
        if(args[1] === 'warning:-y') {
            return mesasge.channel.send(warningYellowMessage)
        };
        if(args[1] === 'warning:-r') {
            return mesasge.channel.send(warningRedMessage)
        };



    }
};