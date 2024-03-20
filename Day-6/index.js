const express = require("express");
const { connection } = require("./db");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const app = express();

const client_id = "c9c6ff39ab250359cf5a";
const client_secret = "00c6c2340f347c0bfbc3279271ebb1c7fc67c95f";
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, my express app is ready");
});

/**
 * Get Current directory - __dirname (Here day_6)
 */

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/auth/github", async (req, res) => {
  const { code } = req.query;
//   console.log(code);
const accessToken =  await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      code ,
      client_id,
      client_secret,
    }),
  }).then((res)=>res.json())

  const user = await fetch("https://api.github.com/user",{
    headers:{
        Authorization : `Bearer ${accessToken.access_token}`
    }
  })
  .then((res)=>res.json())
  .catch((err)=>console.log(err))

  const userEmail = await fetch("https://api.github.com/user/emails",{
    headers:{
        Authorization : `Bearer ${accessToken.access_token}`
    }
  })
  .then((res)=>res.json())
  .catch((err)=>console.log(err))
  
  console.log(userEmail)

//   console.log(accessToken)
  res.send("Sign in with Github successful");
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to Db");
    console.log("App is ruuning on Port 8080");
  } catch (error) {
    console.log(error);
  }
});
