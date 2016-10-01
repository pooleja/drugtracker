var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user.js');

router.get('/', function (req, res) {
  console.log("Authenticated: " + req.isAuthenticated())
  res.render('index', { title: "Home", loggedin: req.isAuthenticated()});
});

router.get('/login', function (req, res) {
  res.render('login', { title: "Login"});
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/', failureRedirect: '/login'
}));

router.get('/signup', function (req, res) {
  res.render('signup', { title: "Signup"});
});

router.post('/signup', function(req, res) {
  User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
      if (err) {
        console.log(err);
        return res.render("signup", {info: "Sorry. That username already exists. Try again."});
      }

      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });
  });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/search', function (req, res) {
  res.render('search', { title: "Lot Search"});
});

router.get('/tracking', function (req, res) {
  res.render('tracking', { title: "Lot Tracking"});
});

router.get('/teirion', function (req, res) {

  // Add teirion login here

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ a: 1 }));
});

module.exports = router;
