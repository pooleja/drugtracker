var mongoose = require('mongoose');

var stageSchema = mongoose.Schema({

   name: {type: String, required: true},
   description: {type: String, required: true},
});

module.exports = mongoose.model('Stage', stageSchema);
