
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const path = require('path')
const config = require("./config.json");
const chalk = require('chalk');


var base64url = require('base64-url');



var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./');


require('./util/eventLoader')(client);







var reload = (message, cmd) => {
    delete require.cache[require.resolve('./commands/' + cmd)];
    try {
        let cmdFile = require('./commands/' + cmd);
    } catch (error) {
        message.channel.send(`Problem loading ${cmd}: ${error}`).then(
            response => response.delete(1000).catch(error => console.log(error.stack))
        ).catch(error => console.log(error.stack));
    }
    message.channel.send(`${cmd} reload was a success!`).then(
        response => response.delete(1000).catch(error => console.log(error.stack))
    ).catch(error => console.log(error.stack));
};
exports.reload = reload;

client.on("message", message => {  //message handler starts here!
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);
    let args = message.content.split(" ").slice(1);
    let args2 = message.content.split(" ").slice(2);
    let cmd = args.join(' ');
    let cmd2 = args2.join(' ');
    var res = cmd.slice(0, 1)



    if (command === "test") {
        console.log(message.channel)
        console.log("ENDLJSLFJSLJFLKSJGLS")
        logger.log('info', `Test command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()}`)

    }












if (command === "killall") {
    if (message.author.id === config.owner) {
        var check = base64url.encode(rand.toString())
        if (!args.join(' ')) {
            message.channel.send('Please get a password! It has been Directly Messaged to you!')
            message.author.send("Base 64 of " + rand)
            message.author.send("Then remove any equal signs(=) from the result!")
        }
        else if (args.join(' ') === check) {
            message.channel.send("Success! View host console for more information. PowerBot shutting down...")
            console.log(chalk.green("PowerBot has been shutdown via Discord Chatbox."))
            console.log(chalk.green("Here are some Information:"))
            console.log(chalk.green(`Auth: ${message.author.username}#${message.author.discriminator} ID: ${message.author.id}`))
            console.log(chalk.green(`Timestamp: ${Date()}`))
            setTimeout(function () {
                process.abort();
            }, 3000);
        }
        else {
            console.log(check)
            message.channel.send("Incorrect Password")
        }
    } else {
        message.channel.send("Insufficant Permissions")
    }
    logger.log('Information', `Killall command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date.now()}`)

}


if (command === "eval") {
    if (message.author.id === config.owner) {
        var x = Date.now();
        try {
            var jvs = args.join(" ");
            var done = eval(jvs);
            if (typeof done !== "string")
                done = require("util").inspect(done);
            message.channel.send(":white_check_mark: **Output:**\n" + "```" + `${clean(done)}` + "```");
            var y = Date.now();
            var noplz = y - x
            message.channel.send("Time used: " + noplz + " ms");
        }
        catch (e) {
            message.channel.send(":x: **Output:**\n" + `\`ERROR\` \`\`\`x1\n${clean(e)}\n\`\`\``);
            var y = Date.now();
            var noplz = y - x
            message.channel.send("Time used: " + noplz + " ms");
        }
    }
    else {
        message.channel.send("Insufficant Permissions")
    }


}

});  //message HANDLER ENDS HERE

function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/` /g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;

}





var token = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on("debug", error => {
    console.log(chalk.cyan(error.replace(token, "HIDDEN")));
});
client.on("warn", error => {
    console.log(chalk.yellow(error.replace(token, "HIDDEN")));
});
// client.on("error", error => {
//     console.log(chalk.red(error.replace(token, "HIDDEN")));
// });


client.login(config.token);
