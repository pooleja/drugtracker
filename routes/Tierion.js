// Constructor
var express = require('express');
var hashclient = require('hashapi-lib-node');
var crypto = require('crypto');

function Tierion() {
  this.hashClient;

}
// class methods
Tierion.prototype.putHash = function(str) {
	var hash = crypto.createHash('sha256').update(str).digest("hex");

  this.hashClient.submitHashItem(hash, function(err, result){
      if(err) {
        console.log(err);
      } else {
        console.log(result);
        return receipt = result.receiptId;
      }
  }); 
};

Tierion.prototype.compareHash = function(str, receipt) {
  this.hashClient.getReceipt(receipt, function(err, result) {
    if(err) {
        console.log(err);
    } else {
      var hash = crypto.createHash('sha256').update(str).digest("hex");
      var j = JSON.parse(result['receipt']);
      if (j['targetHash'].toString() === hash) {
        console.log("match");
        return "match";
      }
      else {
        console.log(hash.toString()+"\ndoesn't match\n"+j['targetHash'].toString());
        return hash+"\ndoesn't match\n"+j['targetHash'].toString();
      }

    }
  });

};



Tierion.prototype.auth = function(callback) {

  var username = 'mtidwell021@gmail.com';
  var password = 'boatsnhoes';

  this.hashClient = new hashclient();
  console.log("hashClient created");
  this.hashClient.authenticate(username, password, function(err, authToken) {
      if(err) {
          console.log(err);
      } else {
        console.log("hashClient set");
        // authentication was successful
        // access_token, refresh_token are returned in authToken
        // authToken values are saved internally and managed autmatically for the life of the HashClient 
        callback();
      }
  });

};


// export the class
module.exports = Tierion;