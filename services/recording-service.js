
require('colors');

/**
 * Starts a recording of the call.
 * @param {object} ttsService - The text-to-speech service.
 * @param {string} callSid - The SID of the call to record.
 */
async function recordingService(ttsService, callSid) {
  try {
    if (process.env.RECORDING_ENABLED === 'true') {
      const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      
      ttsService.generate({partialResponseIndex: null, partialResponse: 'This call will be recorded.'}, 0);
      const recording = await client.calls(callSid)
        .recordings
        .create({
          recordingChannels: 'dual'
        });
          
      console.log(`Recording Created: ${recording.sid}`.red);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { recordingService };