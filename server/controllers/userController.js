//import models
var User = require("../models/user");

//list all users - WORKING
exports.view = function(req, res) {
  User.find(function(err, results) {
    if (err) {
      return res.json({success: false, message: "Fail to query", error: err});
    }
    return res.json({success: true, message: results});
  });
};

//get one user - WORKING
exports.view_one = function(req, res) {
  User.findById(req.params.id, function(err, result) {
    if (err || !result) {
      return res.json({success: false, message: "User not found"});
    } else {
      return res.json({success: true, message: result});
    }
  });
};

//create user - WORKING
exports.create = function(req, res) {

  if (!req.body.name || !req.body.password || !req.body.role) {
    return res.json({success: false, message: "Please enter name, password and role"});
  }

  //check duplicate user name
  var new_user_name = req.body.name;
  User.find({name: new_user_name}, function(err, result) {
    if (err || !result || result.length == 0) {
      var new_user = new User({
        name: req.body.name,
        password: req.body.password,
        role: req.body.role
      });
      new_user.save(function(err, user) {
        if (err) {
          return res.json({
            success: false,
            message: "Fail to save user to database"
          });
        } else {
          return res.json({success: true, message: user});
        }
      });
    } else {
      return res.json({success: false, message: "User name already exists"});
    }
  });
};

//update user - WORKING
exports.update = function(req, res) {
  User.findByIdAndUpdate(req.params.id, {
      password: req.body.password,
      role: req.body.role
    },
    function(err, result0) {
      if (err) {
        return res.json({success: false, message: "Fail to update user"});
      } else {
        return res.json({success: true, message: result0});
      }
    }
  );
};

//remove user - WORKING

exports.delete = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err) {
    if (!err) {
      return res.json({success: true, message: "User deleted!"});

    } else {
      return res.json({success: false, message: "Fail to remove user"});
    }
  });
};
