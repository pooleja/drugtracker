var express = require('express');
var router = express.Router();
var hashclient = require('hashapi-lib-node');

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

  var username = 'mtidwell021@gmail.com';
  var password = 'boatsnhoes';

  var hashClient = new hashclient();

  hashClient.authenticate(username, password, function(err, authToken){
      if(err) {
          // handle the error
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ a: 1 }));
          // authentication was successful
          // access_token, refresh_token are returned in authToken
          // authToken values are saved internally and managed autmatically for the life of the HashClient

        var hash = "hello world" 
   


      }
  });


});

module.exports = router;

