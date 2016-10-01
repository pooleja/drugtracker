var mongoose = require('mongoose');

var transferSchema = mongoose.Schema({
  fromUserId: {type: String, required: true},
  toUserId: {type: String, required: true},
  materialIds: [String],
  createdDate: { type: Date, default: Date.now },

});

module.exports = mongoose.model('Transfer', transferSchema);
