const EventEmitter = require('events');
const uuid = require('uuid');

/**
 * @class StreamService
 * @description A service that handles the streaming of audio data.
 * @extends EventEmitter
 */
class StreamService extends EventEmitter {
  /**
   * Creates an instance of StreamService.
   * @param {*} websocket - The websocket connection.
   */
  constructor(websocket) {
    super();
    this.ws = websocket;
    this.expectedAudioIndex = 0;
    this.audioBuffer = {};
    this.streamSid = '';
  }

  /**
   * Sets the stream SID.
   * @param {string} streamSid - The stream SID.
   */
  setStreamSid (streamSid) {
    this.streamSid = streamSid;
  }

  /**
   * Buffers the audio data.
   * @param {number} index - The index of the audio data.
   * @param {string} audio - The audio data.
   */
  buffer (index, audio) {
    // Escape hatch for intro message, which doesn't have an index
    if(index === null) {
      this.sendAudio(audio);
    } else if(index === this.expectedAudioIndex) {
      this.sendAudio(audio);
      this.expectedAudioIndex++;

      while(Object.prototype.hasOwnProperty.call(this.audioBuffer, this.expectedAudioIndex)) {
        const bufferedAudio = this.audioBuffer[this.expectedAudioIndex];
        this.sendAudio(bufferedAudio);
        this.expectedAudioIndex++;
      }
    } else {
      this.audioBuffer[index] = audio;
    }
  }

  /**
   * Sends the audio data.
   * @param {string} audio - The audio data.
   */
  sendAudio (audio) {
    this.ws.send(
      JSON.stringify({
        streamSid: this.streamSid,
        event: 'media',
        media: {
          payload: audio,
        },
      })
    );
    // When the media completes you will receive a `mark` message with the label
    const markLabel = uuid.v4();
    this.ws.send(
      JSON.stringify({
        streamSid: this.streamSid,
        event: 'mark',
        mark: {
          name: markLabel
        }
      })
    );
    this.emit('audiosent', markLabel);
  }
}

module.exports = {StreamService};