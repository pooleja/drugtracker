var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose'),
    bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    username: String,
    displayname: String,
    password: String,
    stageId: String,
    companyName: String,
    companyAddress: String,
    companyPhone: String,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
