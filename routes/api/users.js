var models = require("../../models");
var express = require('express');
var bcrypt = require('bcryptjs');
//var jwt = require('jsonwebtoken');
var apiRouter = express.Router();

/* logout */
apiRouter.get('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.end('done');
    }
  });
});

/* login */
apiRouter.post('/login', function (req, res, next) {
  let sess = req.session;

  models.user.findOne({
    where: {
      username: req.body.username
    }
  }).then(foundUser => {
    if (foundUser === null) {
      res.sendStatus(401);
    } else {
      let hash = foundUser.password;
      if (bcrypt.compareSync(req.body.password, hash)) {
        sess.username = req.body.username;
        res.end('done');
      } else {
        res.sendStatus(401);
      }
    }
  }
    );
});

/* get current session user */
apiRouter.get('/current', function (req, res, next) {
  let sess = req.session;
  if (sess.username) {
    res.json(sess.username);
  } else {
    res.sendStatus(404);
  }
});

/* create a new user */
apiRouter.post('/register', function (req, res, next) {
  models.user.findOne({
    where: {
      username: req.body.username
    }
  }).then(foundUser => {
    if (foundUser === null) {
      var hash = bcrypt.hashSync(req.body.password, 10);
      const id = models.user.create({
        username: req.body.username,
        password: hash
      });
      res.json(id);
    } else {
      res.sendStatus(401);
    }
  }
    );
});

/* delete existing user */
apiRouter.delete('/:username', function (req, res, next) {
  models.user.destroy({
    where: {
      username: req.params.username
    }
  }).then(function (rowDeleted) {
    res.json({
      deleted: rowDeleted
    })
  }
    );
});

/* GET users listing. */
apiRouter.get('/', function (req, res, next) {
  let sess = req.session;
  if (sess.username) {
    models.user.findAll().then(
      (allUsers) => {
        let users = [];
        allUsers.forEach((user, index) => {
          users.push({
            id: index,
            name: user.username
          })
        });
        res.json({
          users: users
        });
      });
  } else {
    res.sendStatus(401);
  }
});

module.exports = apiRouter;
