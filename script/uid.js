module.exports.config = {
  name: "uid",
  role: 0,
  description: "Get the user's Facebook UID.",
  usages: "{p}uid {p}uid @mention",
  author: "Mirai Team | akhiro team",
};

module.exports.run = async function({ api, event }) {
  if (Object.keys(event.mentions).length === 0) {
    if (event.messageReply) {
      const senderID = event.messageReply.senderID;
      return api.sendMessage(senderID, event.threadID);
    } else {
      return api.sendMessage(`${event.senderID}`, event.threadID, event.messageID);
    }
  } else {
    for (const mentionID in event.mentions) {
      const mentionName = event.mentions[mentionID];
      api.sendMessage(`${mentionName.replace('@', '')}: ${mentionID}`, event.threadID);
    }
  }
};