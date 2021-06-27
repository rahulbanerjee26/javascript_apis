const twilio = require('twilio')
require('dotenv').config()
const twilio_id = process.env.TWILIO_ACCOUNT_SID
const twilio_token = process.env.TWILIO_ACCOUNT_TOKEN

const client = new twilio(twilio_id,twilio_token)
client.calls.each(call => console.log(call),pageSize = 5);