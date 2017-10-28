//import models
var Run = require("../models/run");
var User = require("../models/user");
var ObjectId = require("mongoose").Types.ObjectId;


//get run by user - WORKING
exports.run_list = function(req, res) {

  if (false) {  //req.decoded.role !== "admin"
    return res.json({success: false, message: "No permission to access other users' records"});
  } else {
    if (true) { //!req.params.user_id
      Run.find(function(err, results) {
        if (err) {
          return res.json({success: false, message: "Fail to query", error: err});
        } else {
          return res.json({success: true, message: results});
        }
      });
    } else {
      Run.find({user:  new ObjectId(req.params.user_id)}, function(err, results) {
        if (err) {
          return res.json({success: false, message: "Fail to query", error: err});
        } else {
          return res.json({success: true, message: results});
        }
      });
    }
  }
};

//get one run item - WORKING
exports.run_item = function(req, res) {
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

//create run - WORKING
exports.run_create = function(req, res) {

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

    if (req.body.user_id) {
      new_run.user = req.body.user_id;
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
    if (updatedRun.body.date) {
      run.date = req.body.date;
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

//get weekly report by user - WORKING
exports.run_report = function(req, res) {
  //check permission, allow admin to access others' record
  /*
  var user_id = req.decoded.id;
  var user_role = req.decoded.role;
  if (req.body.user_id && req.body.user_id !== user_id && user_role !== "admin") {
    return res.json({success: false, message: "No permission to access other users' records"});
  }
  if (req.body.user_id) {
    user_id = req.body.user_id;
  }
  */

  console.log("Processing report...");

  // Returns the ISO week of the date.
  Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
     date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }

  // Returns the four-digit year corresponding to the ISO week of the date.
  Date.prototype.getWeekYear = function() {
    var date = new Date(this.getTime());
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    return date.getFullYear();
  }

  //get all run records by user_id
  Run.find( function (err, runs) { //{user: new ObjectId(user_id)},
    if (err || runs.length === 0) {
      return res.json({success: false, message: "Fail to query record or no record", error: err});
    } else {

      let dist_map = new Map();
      let time_map = new Map();
      let count_map = new Map();

      for (let i = 0; i < runs.length; i++) {
        let run_time = runs[i].time;
        let run_dist = runs[i].dist;
        let run_week = runs[i].date.getWeekYear() + " - Week " + runs[i].date.getWeek();

        if (dist_map.has(run_week)) {
          dist_map.set(run_week, dist_map.get(run_week) + run_dist);
          time_map.set(run_week, time_map.get(run_week) + run_time);
          count_map.set(run_week, count_map.get(run_week) + 1);
        } else {
          dist_map.set(run_week, run_dist);
          time_map.set(run_week, run_time);
          count_map.set(run_week, 1);
        }
      }

      let weeklyAvg = [];
      for (let [key, value] of dist_map) {
        let week = key;
        let count = count_map.get(key);
        let dist = value / count;
        let time = time_map.get(key) / count;
        let speed = dist /time * 60;
        weeklyAvg.push({
          week: week,
          dist: dist,
          time: time,
          speed: speed
        });
      }

      console.log("Report ready to be sent...");
      return res.json({success: true, message: weeklyAvg});
    }
  });
};
