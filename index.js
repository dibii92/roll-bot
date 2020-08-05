const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();

let group = [];
let group_obj = [];

const print_t = (group, message) => {
  if (!group.length) {
    return message.channel.send("NO GROUP YOU MONGOL");
  }
  let table = "```diff\n";
  group.forEach((el) => {
    if (el.play === 1) {
      table += "+ ";
    } else if (el.play === -1) {
      table += "- ";
    } else {
      table += "  ";
    }
    table += el.name.concat(" ").padEnd(25, "=").concat(" ") + el.roll;

    if ("roll2" in el) {
      table += " || " + el.roll2;
    }
    table += "\n";
  });
  table += "```";
  message.channel.send(table);
};

const sort_g = (group) => {
  group = group.sort((a, b) => b.roll - a.roll);
};

client.on("message", (message) => {
  if (message.content.includes("!roll") || message.content.includes("!r")) {
    const msg = message.content;
    const username = message.author.username;
    if (!group.map((el) => el.name).includes(username)) {
      group.push({
        name: message.author.username,
        roll: Math.floor(Math.random() * 100) + 1,
        play: 1,
      });
      sort_g(group);
      print_t(group, message);
    }
    if (
      group.map((el) => el.name).includes(username) &&
      msg.split(/(\s+)/).length > 1
    ) {
      group.forEach((el) => {
        if (el.name === username) {
          el.roll = Math.floor(Math.random() * 100) + 1;
        }
      });
      sort_g(group);
      print_t(group, message);
    }
  }
  if (message.content.includes("!end") || message.content.includes("!e")) {
    group = [];
    message.channel.send("END SESSION");
  }
  if (message.content.includes("!p") || message.content.includes("!print")) {
    sort_g(group);
    print_t(group, message);
  }
});

client.once("ready", () => {
  console.log("Ready!");
});

client.login(process.env.TOKEN);
