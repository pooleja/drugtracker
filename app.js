var express = require('express');

var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var app = express();

var srcPath = __dirname + '/sass';
var destPath = __dirname + '/public';
app.use(
  sassMiddleware({
    src: srcPath,
    dest: destPath,
    debug: true,
    outputStyle: 'compressed',
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public/js'));
// Note: you must place sass-middleware *before* `express.static` or else it will
// not work.


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var User = require('./models/user.js');
var MongoStore = require('connect-mongo')(session);
var Env = require('./config/env.js');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/drugtracker');

app.use(express.static('public'));

app.set('trust proxy', 1)
app.use(session({
  secret: Env.COOKIE_SECRET,
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
