var mongoose = require('mongoose');

var counterSchema = mongoose.Schema({

   name: {type: String, required: true},
   count: {type: Number, default: 10}

});

module.exports = mongoose.model('Counter', counterSchema);
