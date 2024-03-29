const moment = require("moment-timezone");

let autoAccept = false;

module.exports = {
  config: {
    name: "accept",
    aliases: ["accept"],
    version: "1.0",
    author: "Jm Labaco",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Make friends via Facebook Account."
    },
    longDescription: {
      en: "Make friends via Facebook Account."
    },
    category: "admin",
    guide: {
      en: "{p}accept "
    }
  },
  onStart: async function ({ api, event, args }) {
    try {
      if (args.length >= 1) {
        if (args[0].toLowerCase() === "on") {
          autoAccept = true;
          return api.sendMessage("Auto-accept is now turned on.", event.threadID);
        } else if (args[0].toLowerCase() === "off") {
          autoAccept = false;
          return api.sendMessage("Auto-accept is now turned off.", event.threadID);
        }
      }

      if (autoAccept) {
        const form = {
          av: api.getCurrentUserID(),
          fb_api_req_friendly_name: "FriendingCometFriendRequestsRootQueryRelayPreloader",
          fb_api_caller_class: "RelayModern",
          doc_id: "4499164963466303",
          variables: JSON.stringify({ input: { scale: 3 } })
        };