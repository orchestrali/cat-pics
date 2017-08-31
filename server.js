// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

const catPicsPlz = require('./src/catPicsPlz');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  catPicsPlz((page) => {
    response.send(page);  
  })
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
