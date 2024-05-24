module.exports.config = {
    name: "confess",
    author: "Rui",
    description: "confess kanaa!",
    usage: "{pn} [uid] [message]",
    cooldown: 5,
  };
  module.exports.run = async function ({ api, args }) {
    const { botPrefix } = global.client;
    if (args.length === 0) {
      api.sendMessage(
        `❌ | Incorrect usage!: Usage is: ${botPrefix}confess [uid] [message]`,
      );
    } else {
      const uid = args.shift();
      const msg = args.join(" ");

        api.sendMessage("💌 | Successfully sent your confession!");
      api.sendMessage(`(⁠*⁠˘⁠︶⁠˘⁠*⁠)⁠.⁠｡⁠*⁠♡💌 | ${msg}`, uid);
    }
  };