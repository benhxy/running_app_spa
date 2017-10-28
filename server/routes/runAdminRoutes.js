var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var config = require("../config");
var run_admin_controller = require("../controllers/runAdminController");

/* token struction:
 - id: user id
 - role: user role
 */

//auth middleware

router.use( function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    console.log("No token");
    return res.json( {success: false, message: "No token provided"} );
  }
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err || decoded.role !== "admin") {
      console.log("Token not valid");
      return res.json( {success: false, message: "Token not valid"});
    }
    req.decoded = decoded;
  });

  console.log("Admin passed validation");
  next();
});



//view all or create one
router.post("/", run_admin_controller.view_or_create);
//view one
router.post("/:id", run_admin_controller.get_one_item);
//update one
router.put("/:id", run_admin_controller.run_update);
//delete one
router.delete("/:id", run_admin_controller.run_delete);


module.exports = router;
