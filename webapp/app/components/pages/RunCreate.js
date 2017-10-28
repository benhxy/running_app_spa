import React, { Component } from 'react';
import {Link} from "react-router";
import axios from "axios";
import moment from "moment";

import WarningCard from "./WarningCard";

export default React.createClass( {

  getInitialState() {
    return {
      compName: "Run details",
      date: "",
      time: 0,
      dist: 0,
      warning: ""
    }
  },

  postRun(newRun) {
    axios.post("/api/run/", newRun, {headers:{token: localStorage.getItem("RunAppToken")}})
      .then(response => {
        if (response.data.success) {
          this.props.history.push("/run");
        } else {
          //error from server
          console.log(response.data.message);
          this.setState({warning: response.data.message});
        }
      })
      .catch((err) => console.log(err));
  },

  handleSubmit(evt) {
    evt.preventDefault();

    //validate input
    if (!moment(this.refs.date.value, "YYYY-MM-DD").isValid()) {
      this.setState({warning: "Please enter a valid date in YYYY-MM-DD"});
      return;
    }
    if (this.refs.dist.value === "" || Number(this.refs.dist.value) <= 0) {
      this.setState({warning: "Please enter a positive number for distance"});
      return;
    }
    if (this.refs.time.value === "" || Number(this.refs.time.value) <= 0) {
      this.setState({warning: "Please enter a positive number for time"});
      return;
    }
    //create new object and post
    const newRun = {
      date: new Date(this.refs.date.value),
      dist: Number(this.refs.dist.value),
      time: Number(this.refs.time.value)
    };
    this.postRun(newRun);
  },

  render() {

    return (
        <div>
          <h3>Add a new run</h3>

          <WarningCard warning={this.state.warning} />

          <form onSubmit={this.handleSubmit}>

            <h5>Date (YYYY-MM-DD)</h5>
            <div className="input-field">
              <input type="date" name="date" ref="date"/>
            </div>

            <h5>Distance (km)</h5>
            <div className="input-field">
              <input type="text" name="dist" ref="dist"/>
            </div>

            <h5>Time (minutes)</h5>
            <div className="input-field">
              <input type="text" name="time" ref="time"/>
            </div>



            <input type="submit" value= "Create" className="btn red"/>
            <span>  </span>
            <input type="reset" value= "Reset" className="btn blue"/>
            <span>  </span>
            <Link to="/run" className="btn blue">Back</Link>

          </form>
        </div>
    );
  }
});
