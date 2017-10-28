var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var config = require("../config");
var run_controller = require("../controllers/runController");

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

  //all clear
  next();
});
*/

/* admin routes */
//get weekly report by user
router.get("/", run_controller.run_report);


module.exports = router;
