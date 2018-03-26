var express = require('express');
var axios = require('axios');

var apiRouter = express.Router();

/* call the calculate endpoint */
apiRouter.post('/calculate', function (req, res, next) {
  let sess = req.session;

  axios.post('localhost:4040/users/login',  {
      
  }).then(function() {

  }).catch(function(){

  })
 
});


module.exports = apiRouter;
