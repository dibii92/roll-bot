const Discord = require("discord.js");
const client = new Discord.Client();

let group = [];
let group_obj = {};

client.on("message", (message) => {
  if (message.content === "!sign") {
    const usr_name = message.author.username;

    if (!group.includes(usr_name)) {
      group.push(usr_name);
      message.channel.send("Group so far : " + group);
    }
  }
  if (message.content === "!grouproll") {
    group_obj = group.map((el) => ({
      name: el,
      roll: Math.floor(Math.random() * 100) + 1,
    }));
    console.log(group_obj);
    //message.channel.send(group_obj);
  }
});

client.once("ready", () => {
  console.log("Ready!");
});

client.login("NzQwNDc4MzQzNjk4MzE3MzYz.XypmMg.olZItgfBeQIjHizZUTXvDjUHDfs");
