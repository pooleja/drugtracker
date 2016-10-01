var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var User = require('./models/user.js');
var MongoStore = require('connect-mongo')(session);

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/drugtracker');

app.use(express.static('public'));

app.set('trust proxy', 1)
app.use(session({
  secret: "asdfasf",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 day cookie expiration
    secure: false
  },
  proxy: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }) // Use mongodb to store connection info
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var standardRoutes = require('./routes/index');
app.use('/', standardRoutes);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
