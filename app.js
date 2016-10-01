var express = require('express');
var app = express();

var standardRoutes = require('./routes/index');

app.use('/', standardRoutes);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
