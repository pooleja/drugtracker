var express = require('express');
var router = express.Router();
var hashclient = require('hashapi-lib-node');
var crypto = require('crypto');
var request = require('request')
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

router.get('/tierion', function (req, res) {
  

});

module.exports = router;

