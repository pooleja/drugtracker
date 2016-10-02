var mongoose = require('mongoose');

var receiptSchema = mongoose.Schema({

   createdDate: { type: Date, default: Date.now },
   receiptId: String,
   transferId: String,
});

module.exports = mongoose.model('Receipt', receiptSchema);
