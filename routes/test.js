var Tierion = require('./Tierion.js');

var t = new Tierion();
t.auth(function(){
	//receiptId to "hello world"   57f06f92c7a7eb032af78f17  -> b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
	//receiptId to "hello world21" 57f06ff5c7a7eb032af78f1c  -> ec6e5217b0bb3397b45da4c4c6e450af24f8d23f183d442f804697ff714fee84
	//var puttest = t.putHash("hello world21");
	var JSONObj = { "bookname ":"VB BLACK BOOK", "price":500 };
	var puttest = t.compareHash(JSONObj,"57f06f92c7a7eb032af78f17");
	console.log(puttest);
	
});
