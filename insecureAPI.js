const fetch = require("node-fetch");

const apiURL = "https://dog-facts-api.herokuapp.com/api/v1/resources/dogs/all";
console.log(`Making Request to ${apiURL}`);
fetch(apiURL)
  .then((result) => result.json())
  .then((res) => {
    res.map((element, idx) => console.log(`${idx}. ${element.fact}`));
  })
  .catch((err) => console.log(err));

const apiURL = "https://dog-facts-api.herokuapp.com/api/v1/resources/dogs";
const params = {
  number: 2,
};
fetch(`${apiURL}?number=${params.number}`)
  .then((result) => result.json())
  .then((res) => {
    res.map((element, idx) => console.log(`${idx}. ${element.fact}`));
  })
  .catch((err) => console.log(err));
