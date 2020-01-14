// server.js
// where your node app starts








const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
const express = require("express");
const app = express();
const fetch = require("node-fetch");

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
// init project
// Redirect HTTP to HTTPS,
app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

//logging for each request
app.use((req,resp,next) => {
  const now = new Date ();
  const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
  const path = `"${req.method} ${req.path}"`;
  const m = `${req.ip} - ${time} - ${path}`;
  // eslint-disable-next-line no-console
  console.log(m);
  next();
  
});
// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
