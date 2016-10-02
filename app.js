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

var standardRoutes = require('./routes/index');

app.use('/', standardRoutes);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
