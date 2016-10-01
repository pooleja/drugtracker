var mongoose = require('mongoose');

var materialSchema = mongoose.Schema({

   name: {type: String, required: true},
   materialId: {type: String, required: true, unique: true}
   ownerId: {type: String, required: true}, // foreign key
   stageId: {type: String, required: true}, // foreign key
   trackingId: {type: String, required: true},

});

module.exports = mongoose.model('Material', materialSchema);
