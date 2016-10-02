var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user.js');
var Material = require('../models/material.js');
var Stage = require('../models/stage.js');
var Transfer = require('../models/transfer.js');
var mongoose = require('mongoose');

router.get('/', function (req, res) {

  if(!req.isAuthenticated())
    return res.redirect('/login');

  Material.find({ ownerId: req.user.id }, function(err, foundMaterials){

    if(err){
       console.log("Failed to find materials.")
    }

    var ret = [];
    if(foundMaterials)
      ret = foundMaterials;

    res.render('index', { title: "Home", materials: ret});
  });

});

router.get('/login', function (req, res) {
  res.render('login', { title: "Login"});
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/', failureRedirect: '/login'
}));

router.get('/signup', function (req, res) {
  res.render('signup', { title: "Signup"});
});

router.post('/signup', function(req, res) {
  User.register(new User({
      username : req.body.username,
      stageId: req.body.stage,
      companyName: req.body.companyName,
      companyAddress: req.body.companyAddress,
      companyPhone: req.body.companyPhone,
    }), req.body.password, function(err, account) {

      if (err) {
        console.log(err);
        return res.render("signup", {info: "Sorry. That username already exists. Try again."});
      }

      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });
  });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/search', function (req, res) {
  res.render('search', { title: "Lot Search"});
});

router.get('/tracking', function (req, res) {
  res.render('tracking', { title: "Lot Tracking"});
});

router.get('/submit', function (req, res) {
  res.render('submit', { title: "Submit Lot"});
});

router.get('/error', function (req, res) {
  res.render('error', { title: "Lot Error"});
});

router.get('/teirion', function (req, res) {

  // Add teirion login here

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ a: 1 }));
});


router.get("/stages", function(req, res){

//  var s = new Stage({name:"Raw Materials", description:"Raw Material Suppliers."});
//  s.save();

});


router.get("/viagra", function(req, res){

//  var s = new Stage({name:"Raw Materials", description:"Raw Material Suppliers."});
//  s.save();

// Raw Material stage = 57f02e2b7f3b0bfe2fee4587
// Owner James123 - 57f016739e2b41f5d43581cb
// Materials:
// "Sildenafil Citrate" - 57f030673f2052ff381c5324
// Microcrystalline Cellulose - 57f030673f2052ff381c5325
// Anhydrous Dibasic Calcium Phosphate - 57f030673f2052ff381c5326
// Croscarmellose Sodium - 57f030673f2052ff381c5327

// Manufacturer Stage - 57f02e2c7f3b0bfe2fee4589
// Owner - james1 - 57f015cd9e2b41f5d43581ca
// Materials:
// Sildenafil - 57f031c11cf1f7ffeadba6ca

// Pharmacy Stage - 57f02e2c7f3b0bfe2fee458b
// Owner - james - 57f00f712e9fb0f2bc919e90
// Materials:
// Viagra - 57f031f3aa4fd6fff293aecd

  Material.findById('57f031f3aa4fd6fff293aecd' , function(err, viagra){
    Transfer.findOne({targetMaterialId: viagra.id}, function(err, viagraTransfer){
      Material.findOne({'_id': { $in: [viagraTransfer.sourceMaterialIds]}}, function(err, sildenafil){
        Transfer.findOne({targetMaterialId: sildenafil.id}, function(error, sildenafilTransfer){


          Material.find({'_id':  { $in: sildenafilTransfer.sourceMaterialIds.map(function(o){ return mongoose.Types.ObjectId(o); })}}, function(err, sourceMaterials){

            console.log("----" + sourceMaterials);

            res.render('viagra', { title: "Viagra",
              viagra: viagra,
              viagraTransfer: viagraTransfer,
              sildenafil: sildenafil,
              sildenafilTransfer: sildenafilTransfer,
              sourceMaterials: sourceMaterials
            });
          })
        });
      });
    });
  });

});


/*router.get("/create_materials", function(req, res){

  var m = new Material({name:"Viagra", ownerId: "57f00f712e9fb0f2bc919e90", stageId:"57f02e2c7f3b0bfe2fee458b"});
  m.save();

  res.send(JSON.stringify({ a: 1 }));

});*/

router.get("/materials", function(req, res){

  if(!req.isAuthenticated())
    return res.redirect('/login');

  Material.find({ ownerId: req.user.id }, function(err, foundMaterials){

    if(err){
       console.log("Failed to find materials.")
    }

    var ret = {};
    if(foundMaterials)
      ret = foundMaterials;

    res.render('materials', { title: "Materials", materials: foundMaterials});
  });
});

function getNextStage(currentStage){
    if(currentStage == '57f02e2b7f3b0bfe2fee4587')
      //return '57f02e2c7f3b0bfe2fee4588';
      return '57f02e2c7f3b0bfe2fee4589';

    if(currentStage == '57f02e2c7f3b0bfe2fee4588')
      return '57f02e2c7f3b0bfe2fee4589';

    if(currentStage == '57f02e2c7f3b0bfe2fee4589')
      //return '57f02e2c7f3b0bfe2fee458a';
      return '57f02e2c7f3b0bfe2fee458b';

    if(currentStage == '57f02e2c7f3b0bfe2fee458a')
      return '57f02e2c7f3b0bfe2fee458b';

    if(currentStage == '57f02e2c7f3b0bfe2fee458b')
      //return '57f02e2c7f3b0bfe2fee458c';
      return "";

    return "";
}

router.get("/create_transfer", function(req, res){
  if(!req.isAuthenticated())
    return res.redirect('/');

  Material.find({ ownerId: req.user.id }, function(err, foundMaterials){

    if(err){
       console.log("Failed to find materials.")
    }

    var nextStage = getNextStage(foundMaterials[0].stageId);
    console.log("Next stage: " + nextStage);
    User.find({ stageId: nextStage }, function(err, foundtargetUsers){

      res.render('submit', { title: "Create Transfer", materials: foundMaterials, targetUsers: foundtargetUsers, user: req.user});

    });
  });

});


router.post("/create_transfer", function(req, res){
  if(!req.isAuthenticated())
    return res.redirect('/');

  var sourceMaterials = req.body.sourceMaterials;
  var newMaterialName = req.body.materialName;
  var targetUserId = req.body.targetUser;

  // Create new material and assign to user
  var m = new Material({name:newMaterialName, ownerId: targetUserId, stageId: getNextStage(req.user.stageId)});
  m.save();

  // Create new transfer
  var t = new Transfer({
    fromUserId: req.user.id,
    toUserId: targetUserId,
    sourceMaterialIds: sourceMaterials,
    targetMaterialId: m.id,
  });
  t.save();

  // Submit hash to blockchain and create receipt

});

router.get("/create_material", function(req, res){
    if(!req.isAuthenticated() || req.user.stageId != "57f02e2b7f3b0bfe2fee4587")
      return res.redirect('/');

    res.render('create_material', { title: "Create Material"});

});

router.post("/create_material", function(req, res){
    if(!req.isAuthenticated() || req.user.stageId != "57f02e2b7f3b0bfe2fee4587")
      return res.redirect('/');

    var m = new Material({
      name:req.body.name,
      ownerId: req.user.id,
      stageId:"57f02e2b7f3b0bfe2fee4587"
    });
    m.save();

    return res.redirect('/materials');

});

module.exports = router;
