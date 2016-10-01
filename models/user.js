var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose'),
    bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    username: String,
    password: String,
    userId: {type: String, required: true, unique: true},
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
