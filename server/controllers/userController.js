//import models
var User = require("../models/user");

//list all users - WORKING
exports.user_list = function(req, res) {
  User.find(function(err, results) {
    if (err) {
      return res.json({success: false, message: "Fail to query", error: err});
    }
    return res.json({success: true, message: results});
  });
};

//get one user - WORKING
exports.user_detail = function(req, res) {
  User.findById(req.params.id, function(err, result) {
    if (err || !result) {
      return res.json({success: false, message: "User not found"});
    } else {
      return res.json({success: true, message: result});
    }
  });
};

//create user - WORKING
exports.user_create = function(req, res) {

  if (!req.body.name || !req.body.password || !req.body.role) {
    return res.json({success: false, message: "Please enter name, password and role"});
  }

  //check duplicate user name
  var new_user_name = req.body.name;
  User.find({name: new_user_name}, function(err, result) {
    if (err) {
      return res.json({success: false, message: "Fail to query user"});
    }

    if (result.length === 0) {
      var new_user = new User({
        name: req.body.name,
        password: req.body.password,
        role: req.body.role
      });
      new_user.save(function(err, user) {
        if (err) {
          return res.json({
            success: false,
            message: "Fail to save user to database",
            error: err
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
exports.user_update = function(req, res) {

  console.log("Req in controller");

  User.find({name: req.body.name}, function(err, result) {
    if (result.length > 0) {
      return res.json({success: false, message: "This user name already exists"});
    }
  });

  User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      password: req.body.password,
      role: req.body.role
    },
    function(err, user) {
      if (err) {
        return res.json({success: false, message: "Fail to update user", error: err});
      } else {
        User.findById(req.params.id, function(err, result) {
          return res.json({success: true, message: result});
        });
      }
    }
  );
};

//remove user - WORKING
exports.user_delete = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) {
      return res.json({success: false, message: "Fail to remove user", error: err});
    } else {
      return res.json({success: true, message: "User deleted!"});
    }
  });
};
