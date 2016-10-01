var mongoose = require('mongoose');

var stageSchema = mongoose.Schema({

   name: {type: String, required: true},
   description: {type: String, required: true},
   stageId: {type: String, required: true},
});

module.exports = mongoose.model('Material', materialSchema);
