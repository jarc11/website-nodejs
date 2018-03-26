var express = require('express');
var http = require('http');
var btoa = require('btoa')

var apiRouter = express.Router();

var defaultUser = "springtestapp";
var defaultPassword = "kj945S!Df48345d";


/* login */
apiRouter.post('/login', function (req, res, next) {
  let sess = req.session;
  var request = JSON.stringify({
    username: req.body.username,
    password: req.body.password
  })
  var options = {
    hostname: 'localhost',
    path: '/users/login',
    port: 4040,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(request),
      'Authorization':'Basic ' + btoa(defaultUser + ":" + defaultPassword)
    }
  }
  var httpRequest = http.request(options, (response) => {
    response.setEncoding('utf8');
    let responseString = "";
    if (response.statusCode != "200") {
      console.log("HTTP response code = " + response.statusCode + ", Response message = " + response.statusMessage);
    }
    response.on('data', (body) => {
      responseString += body;
    })
    response.on('end', () => {
      try {
        const parsedData = JSON.parse(responseString);
        if (parsedData.passwordCorrect) {
          sess.username = req.body.username;
          res.json(parsedData);
        }
      } catch (e) {
        res.send(e.message);
        console.error(e.message);
      }
    });
  }).on('error', (error) => {
    console.log(error.message);
    res.send(error.message);
  })
  
  httpRequest.write(request);
  httpRequest.end();
  
});

/* create a new user */
apiRouter.post('/register', function (req, res) {

  axios.post('localhost:4040/users/add', {
    username: req.body.username,
    password: req.body.password,
    enabled: true,
    admin: false
  }).then(function(response){
    console.log(response.data);
  }).catch(function(error){
    console.log(error);
  })
});

module.exports = apiRouter;
