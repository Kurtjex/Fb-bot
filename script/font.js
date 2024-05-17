module.exports.config = {
    name: "font",
    description: "font text lol",
    credits: "Rui",
    cooldown: 5,
    usage: "{pn} - font input",
    role: 0,
  };
  module.exports.run = async function({ message, args, fonts }) {
    const font = args.shift();
    const input = args.join(" ");
    if (!font || !input) {
      message.reply("❌ | Missing font and input!");
    } else {
      let result = "";

      if (font === "sans") {
        result = fonts.sans(input);
      } else if (font === "bold") {
        result = fonts.bold(input);
      } else {
        result =
          '❌ | Invalid font options. Available options are "sans" and "bold".';
      }

      message.reply(result);
    }
  };