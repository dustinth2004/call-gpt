require('dotenv').config();
const transferCall = require('../functions/transferCall');

// Mock the twilio client
const mockUpdate = jest.fn().mockResolvedValue({});
const mockCalls = jest.fn(() => ({
  update: mockUpdate,
}));
jest.mock('twilio', () => {
  return jest.fn(() => ({
    calls: mockCalls,
  }));
});

test('Expect transferCall to successfully redirect call', async () => {
  const callSid = 'CA12345678901234567890123456789012';
  const transferResult = await transferCall({callSid});

  expect(mockCalls).toHaveBeenCalledWith(callSid);
  expect(mockUpdate).toHaveBeenCalledWith({
    twiml: `<Response><Dial>${process.env.TRANSFER_NUMBER}</Dial></Response>`,
  });
  expect(transferResult).toBe('The call was transferred successfully');
});