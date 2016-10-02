var mongoose = require('mongoose');

var transferSchema = mongoose.Schema({
  fromUserId: {type: String, required: true},
  toUserId: {type: String, required: true},
  sourceMaterialIds: [String],
  targetMaterialId:{type: String},
  createdDate: { type: Date, default: Date.now },
  authorized:  Boolean, //•Is authorized as required under DSCSA;
  sourceAuthorized:  Boolean, //•Received the product from a person that is authorized as required under DSCSA;
  recievedTsFromSource:  Boolean, //•Received transaction information and a transaction statement from the prior owner of the product, as required under the law;
  notIllegal:  Boolean, // •Did not knowingly ship a suspect or illegitimate product;
  complied:  Boolean, // •Had systems and processes in place to comply with verification requirements under the law;
  notFalseInfo:  Boolean, //•Did not knowingly provide false transaction information; and
  notAltered:  Boolean, //•Did not knowingly alter the transaction history.
});

module.exports = mongoose.model('Transfer', transferSchema);
