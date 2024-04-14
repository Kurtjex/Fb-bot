module.exports.config = {
  name: "restart",
  version: "1.0.0",
  role: 1,
  hasPrefix: true,
  aliases: ['res', 'reboot'],
  description: "Restart Bot",
  usages: "restart",
  credits: "manhIT",
  commandCategory: "system",
  usages: "",
  cooldowns: 0
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;
  return api.sendMessage(`${global.config.BOTNAME} Bot are now Restarting...`, threadID, () => process.exit(1));
}