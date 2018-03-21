var express = require('express');
var axios = require('axios');

var apiRouter = express.Router();

/* login */
apiRouter.post('/login', function (req, res, next) {
  let sess = req.session;

  axios

  res.redirect()
 
});


/* create a new user */
apiRouter.post('/register', function (req, res, next) {

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
