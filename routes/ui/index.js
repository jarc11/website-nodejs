var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Home', loggedIn: loggedIn(req)});
});

router.get('/account', function(req, res, next) {
  res.render('account', {title: 'My Account', loggedIn: loggedIn(req)});
});

router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login', loggedIn: loggedIn(req)});
});

router.get('/register', function(req, res, next) {
  res.render('register', {title: 'Register', loggedIn: loggedIn(req)});
});

router.get('/logout', function(req, res, next){
  req.session.username = undefined;
  res.render('index', {title: 'Home', loggedIn: loggedIn(req)});
})

function loggedIn(req) {
  return (req.session.username === undefined ? false : true);
}

module.exports = router;