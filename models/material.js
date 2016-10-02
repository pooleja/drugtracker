var mongoose = require('mongoose');

var materialSchema = mongoose.Schema({

   name: {type: String, required: true},
   ownerId: {type: String, required: true}, // foreign key
   stageId: {type: String, required: true}, // foreign key

});

module.exports = mongoose.model('Material', materialSchema);
