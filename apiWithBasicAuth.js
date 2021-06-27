const fetch = require("node-fetch");
const base64 = require("base-64");

require("dotenv").config();
const twilio_id = process.env.TWILIO_ACCOUNT_SID;
const twilio_token = process.env.TWILIO_ACCOUNT_TOKEN;

headers = {
  Authorization: "Basic " + base64.encode(twilio_id + ":" + twilio_token),
};
const api_url = `https://api.twilio.com/2010-04-01/Accounts/${twilio_id}/Calls.json?PageSize=5`;

fetch(api_url, {
  headers: headers,
})
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
