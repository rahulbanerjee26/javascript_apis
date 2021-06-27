const fetch = require("node-fetch");
require("dotenv").config();

const CAT_API_KEY = process.env.API_KEY;
const headers = {
  "x-api-key": CAT_API_KEY,
};
const api_url = "https://api.thecatapi.com/v1/breeds";

fetch(api_url, {
  headers: headers,
})
  .then((result) => result.json())
  .then((res) => {
    res.map((element, idx) =>
      console.log(`${idx}. ${element.name} : ${element.description}`)
    );
  })
  .catch((err) => console.log(err));
