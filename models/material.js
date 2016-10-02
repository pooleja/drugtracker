var mongoose = require('mongoose');

var materialSchema = mongoose.Schema({

   name: {type: String, required: true},
   ownerId: {type: String, required: true}, // foreign key
   stageId: {type: String, required: true}, // foreign key
   dosage: {type: String}, //  Strength and dosage form of the product;
   nationalDrugCode: {type: String}, // National Drug Code number of the product;
   containerSize: {type: String}, // • Container size;
   numContainers: {type: String}, // • Number of containers;
   lotNumber: {type: String}, // • Lot number of the product;
});

module.exports = mongoose.model('Material', materialSchema);
