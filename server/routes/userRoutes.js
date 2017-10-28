var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var config = require("../config");
var user_controller = require("../controllers/userController");

/* token struction:
 - id: user id
 - role: user role
 */

//auth middleware
/*
router.use( function(req, res, next) {
  //get token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  //no token error
  if (!token) {
    res.json( {success: false, message: "No token provided"});
  }
  //token verification error
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      res.json( {success: false, message: "Fail to verify token"});
    }
    req.decoded = decoded;
  });
  //permission error
  if (req.decoded.role !== "userManager" && req.decoded.role !== "admin") {
    res.json( {success: false, message: "No permission to access user database"});
  }
  //all clear
  next();
});
*/


//get one user detail
router.get('/:id', user_controller.user_detail);

//get all users
router.get('/', user_controller.user_list);

//create user
router.post("/", user_controller.user_create);

//update user
router.put("/:id", user_controller.user_update);

//delete user, protected by admin role
router.delete("/:id", user_controller.user_delete);

module.exports = router;
