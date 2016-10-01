var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index', { title: "Home"});
});

router.get('/login', function (req, res) {
  res.render('login', { title: "Login"});
});

router.get('/search', function (req, res) {
  res.render('search', { title: "Lot Search"});
});

router.get('/tracking', function (req, res) {
  res.render('tracking', { title: "Lot Tracking"});
});

module.exports = router;
