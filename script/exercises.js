const axios = require('axios');
const fs = require('fs');
const { createReadStream } = require('fs');

module.exports.config = {
  name: 'Exercises',
  version: '1.0.0',
  hasPermission: 0,
  credits: 'August Quinn',
  description: 'Retrieve exercises for a specific body part.',
  commandCategory: 'Fitness',
  usages: ['/Exercises [bodyPart]'],
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  if (args.length === 0) {
    api.sendMessage('Please provide a body part to retrieve exercises.', threadID, messageID);
    return;
  }

  const bodyPart = args.join(' ');

  try {
    const response = await axios.get(`https://exercise-qlo6.onrender.com/exercises?bodyPart=${encodeURIComponent(bodyPart)}`);
    const exercises = response.data;

    if (exercises.length === 0) {
      api.sendMessage(`No exercises found for the body part "${bodyPart}".`, threadID, messageID);
      return;
    }

    const exerciseAttachments = [];
    exercises.forEach(async (exercise, index) => {
      const message = `𝗡𝗔𝗠𝗘: ${exercise.name}\n𝗘𝗤𝗨𝗜𝗣𝗠𝗘𝗡𝗧: ${exercise.equipment}\n𝗜𝗡𝗦𝗧𝗥𝗨𝗖𝗧𝗜𝗢𝗡𝗦:\n${exercise.instructions.map(step => `> ${step}`).join('\n')}`;
      const gifURL = exercise.gifUrl;

      const path = __dirname + `/cache/exercise${index}.gif`;
      const getContent = axios.get(gifURL, { responseType: 'arraybuffer' });
      getContent.then((res) => {
        fs.writeFileSync(path, Buffer.from(res.data, 'binary'));
        exerciseAttachments.push({ body: message, attachment: createReadStream(path) });

 if (exerciseAttachments.length === exercises.length) {
          exerciseAttachments.forEach((attachment) => {
            api.sendMessage(attachment, threadID);
          });
        }
      });
    });
  } catch (error) {
    console.error(error);
    api.sendMessage('An error occurred while fetching exercises.', threadID, messageID);
  }
};