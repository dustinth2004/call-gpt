/**
 * @file This file contains a script to make an outbound call from the application.
 * @description This script is used to test the application by making an outbound call to a specified number.
 */

require('dotenv').config();

/**
 * Makes an outbound call from the application.
 */
async function makeOutBoundCall() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  
  const client = require('twilio')(accountSid, authToken);

  await client.calls
    .create({
      url: `https://${process.env.SERVER}/incoming`,
      to: process.env.YOUR_NUMBER,
      from: process.env.FROM_NUMBER
    })
    .then(call => console.log(call.sid));
}

makeOutBoundCall();