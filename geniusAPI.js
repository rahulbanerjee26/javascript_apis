require("dotenv").config();
const fetch = require("node-fetch");

const getData = async () => {
  const genius_client_id = process.env.GENIUS_API_CLIENT_ID;
  const genius_client_secret = process.env.GENIUS_API_CLIENT_SECRET;
  const redirect_uri = "https://httpbin.org/anything";

  let params = {
    client_id: genius_client_id,
    redirect_uri: redirect_uri,
    response_type: "code",
    scope: "me",
  };

  let endpoint = "https://api.genius.com/oauth/authorize?";
  endpoint = endpoint + new URLSearchParams(params);

  const open = require("open");
  open(endpoint);

  const readlineSync = require("readline-sync");
  const access_code = readlineSync.question("Please enter the access code ");
  console.log("CODE IS ", access_code);

  params["client_secret"] = genius_client_secret;
  params["code"] = access_code;
  params["grant_type"] = "authorization_code";

  const access_token_url = "https://api.genius.com/oauth/token?";
  let response = await fetch(access_token_url + new URLSearchParams(params), {
    headers: { Accept: "application/json" },
    method: "POST",
  });
  let data = await response.json();
  const access_token = data["access_token"];
  console.log(access_token);

  const headers = {
    authorization: `Bearer ${access_token}`,
  };

  const base_api_endpoint = "https://api.genius.com/account";
  response = await fetch(base_api_endpoint, {
    headers: headers,
  });
  data = await response.json();
  console.log(data);
};

getData();
