const fetch = require("node-fetch");

require("dotenv").config();

const getData = async () => {
  const client_id = process.env.GITHUB_API_CLIENT_ID;
  const client_secret = process.env.GITHUB_API_CLIENT_SECRET;
  const redirect_uri = "https://httpbin.org/anything";

  let params = {
    client_id: client_id,
    redirect_uri: redirect_uri,
    scope: "user",
  };

  let endpoint = "https://github.com/login/oauth/authorize?";
  endpoint = endpoint + new URLSearchParams(params);

  const open = require("open");
  open(endpoint);

  const readlineSync = require("readline-sync");
  const access_code = readlineSync.question("Please enter the access code ");
  console.log("CODE IS ", access_code);

  params["client_secret"] = client_secret;
  params["code"] = access_code;
  const access_token_url = "https://github.com/login/oauth/access_token?";
  let response = await fetch(access_token_url + new URLSearchParams(params), {
    headers: { Accept: "application/json", method: "POST" },
  });
  let data = await response.json();
  const access_token = data["access_token"];
  console.log(access_token);

  const headers = {
    Authorization: `token ${access_token}`,
  };

  const base_api_endpoint = "https://api.github.com/user";
  response = await fetch(base_api_endpoint + "/repos", {
    headers: headers,
  });
  data = await response.json();
  console.log(data);
};

getData();
