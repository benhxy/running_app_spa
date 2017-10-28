//import models
var Run = require("../models/run");
var User = require("../models/user");
var ObjectId = require("mongoose").Types.ObjectId;


//view all or create one - WORKING
exports.view_or_create = function(req, res) {
  if (req.body.action === "GET") {
    //VIEW all items
    if (false) {  //req.decoded.role !== "admin"
      return res.json({success: false, message: "No permission to access other users' records"});
    } else {
      Run.find(function(err, results) {
        if (err) {
          return res.json({success: false, message: "Fail to query", error: err});
        } else {
          return res.json({success: true, message: results});
        }
      });
    }
  } else {
    //CREATE one item
    if (false) {  //req.decoded.role !== "admin"
      return res.json({success: false, message: "No permission to access other users' records"});
    } else {
      var new_run = new Run();

      if (req.body.dist) {
        new_run.dist = req.body.dist;
      } else {
        return res.json({success: false, message: "Distance cannot be empty"});
      }

      if (req.body.time) {
        new_run.time = req.body.time;
      } else {
        return res.json({success: false, message: "Time cannot be empty"});
      }

      if (req.body.user) {
        new_run.user = req.body.user;
      } else {
        new_run.user = req.decoded.id;
      }

      if (req.body.date) {
        new_run.date = req.body.date;
      }

      new_run.save(function(err, result) {
        if (err || !result){
          return res.json({success: false, message: "Fail to save the record", error: err});
        } else {
          return res.json({success: true, message: result});
        }
      });
    }
  }

};

//get one run item - WORKING
exports.get_one_item = function(req, res) {
  if (false) {  //req.decoded.role !== "admin"
    return res.json({success: false, message: "No permission to access other users' records"});
  } else {
    Run.findById(req.params.id, function(err, result) {
      if (err) {
        return res.json({success: false, message: "Record not found", error: err});
      } else {
        return res.json({success: true, message: result});
      }
    });
  }
};

//update run - WORKING
exports.run_update = function(req, res) {

  if (false) {  //req.decoded.role !== "admin"
    return res.json({success: false, message: "No permission to access other users' records"});
  } else {
    var updatedRun = {};
    if (req.body.dist) {
      updatedRun.dist = req.body.dist;
    }
    if (req.body.time) {
      updatedRun.time = req.body.time;
    }
    if (req.body.date) {
      updatedRun.date = req.body.date;
    }

    Run.findByIdAndUpdate(req.params.id, updatedRun, function(err, run) {
      if (err || !run){
        return res.json({success: false, message: "Fail to update the record", error: err});
      } else {
        return res.json({success: true, message: result});
      }
    });
  }
};

//delete run - WORKING
exports.run_delete = function(req, res) {
  if (false) {  //req.decoded.role !== "admin"
    return res.json({success: false, message: "No permission to access other users' records"});
  } else {
    Run.findByIdAndRemove(req.params.id, function(err, run) {
      if (err || !run){
        return res.json({success: false, message: "Fail to delete record", error: err});
      } else {
        return res.json({success: true, messgae: "Record deleted"});
      }
    });
  }
};
