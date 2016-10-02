// Constructor
var express = require('express');
var hashclient = require('hashapi-lib-node');
var crypto = require('crypto');
var Env = require('../config/env.js');


function Tierion() {
  this.hashClient;

}
// class methods
Tierion.prototype.putHash = function(str, callback) {
	var hash = crypto.createHash('sha256').update(str).digest("hex");

  this.hashClient.submitHashItem(hash, function(err, result){
      if(err) {
        console.log(err);
        callback(err);
      } else {
        console.log(result);
        callback(null, result.receiptId);
      }
  });
};

Tierion.prototype.compareHash = function(str, receipt, callback) {
  this.hashClient.getReceipt(receipt, function(err, result) {
    if(err) {
        console.log(err);
        callback(err);
    } else {
      var hash = crypto.createHash('sha256').update(str).digest("hex");
      var j = JSON.parse(result['receipt']);
      callback(null, j['targetHash'].toString() === hash);
    }
  });

};



Tierion.prototype.auth = function(callback) {

  this.hashClient = new hashclient();
  console.log("hashClient created");
  this.hashClient.authenticate(Env.USER, Env.PASS, function(err, authToken) {
      if(err) {
          console.log(err);
          callback(err)
      } else {
        console.log("hashClient set");
        // authentication was successful
        // access_token, refresh_token are returned in authToken
        // authToken values are saved internally and managed autmatically for the life of the HashClient
        callback(null);
      }
  });

};


// export the class
module.exports = Tierion;
