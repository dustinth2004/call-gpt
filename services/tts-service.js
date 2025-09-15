require('dotenv').config();
const { Buffer } = require('node:buffer');
const EventEmitter = require('events');
const fetch = require('node-fetch');

/**
 * @class TextToSpeechService
 * @description A service that handles text-to-speech conversion.
 * @extends EventEmitter
 */
class TextToSpeechService extends EventEmitter {
  /**
   * Creates an instance of TextToSpeechService.
   */
  constructor() {
    super();
    this.nextExpectedIndex = 0;
    this.speechBuffer = {};
  }

  /**
   * Generates audio from text.
   * @param {object} gptReply - The GPT reply object.
   * @param {number} gptReply.partialResponseIndex - The index of the partial response.
   * @param {string} gptReply.partialResponse - The partial response text.
   * @param {number} interactionCount - The interaction count.
   */
  async generate(gptReply, interactionCount) {
    const { partialResponseIndex, partialResponse } = gptReply;

    if (!partialResponse) { return; }

    try {
      const response = await fetch(
        `https://api.deepgram.com/v1/speak?model=${process.env.VOICE_MODEL}&encoding=mulaw&sample_rate=8000&container=none`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Token ${process.env.DEEPGRAM_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: partialResponse,
          }),
        }
      );

      if (response.status === 200) {
        try {
          const blob = await response.blob();
          const audioArrayBuffer = await blob.arrayBuffer();
          const base64String = Buffer.from(audioArrayBuffer).toString('base64');
          this.emit('speech', partialResponseIndex, base64String, partialResponse, interactionCount);
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log('Deepgram TTS error:');
        console.log(response);
      }
    } catch (err) {
      console.error('Error occurred in TextToSpeech service');
      console.error(err);
    }
  }
}

module.exports = { TextToSpeechService };