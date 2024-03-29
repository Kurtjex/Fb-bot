module.exports.config = {
    name: "sendnoti",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Yan Maglinte",
    description: "Sends a message to all groups and can only be done by the admin.",
    usePrefix: true,
    commandCategory: "message",
    usages: "[Text]",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const pogi = "61551488702462";
   if (!pogi.includes(event.senderID))
   return api.sendMessage("gold kaba?", event.threadID, event.messageID);
    const threadList = await api.getThreadList(25, null, ['INBOX']);
    let sentCount = 0;
    const custom = args.join(' ');

    async function sendMessage(thread) {
        try {
            await api.sendMessage(`› 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡:\n\n${custom}`, thread.threadID);
            sentCount++;
        } catch (error) {
            console.error("Error sending a message:", error);
        }
    }

    for (const thread of threadList) {
        if (sentCount >= 20) {
            break;
        }
        if (thread.isGroup && thread.name != thread.threadID && thread.threadID != event.threadID) {
            await sendMessage(thread);
        }
    }

    if (sentCount > 0) {
        api.sendMessage(`› Sent the notification successfully.`, event.threadID);
    } else {
        api.sendMessage("› No eligible group threads found to send the message to.", event.threadID);
    }
};