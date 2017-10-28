import React, { Component } from 'react';
import {Link} from "react-router";
import axios from 'axios';
import moment from "moment";

import WarningCard from "./WarningCard";

export default React.createClass(  {

  getInitialState() {
    // super(props);
    return {
      compName: "Run details",
      id: "",
      date: "",
      time: 0.0,
      dist: 0.0,
      warning: ""
    }
  },

  componentWillMount() {
    this.getRunDetail();
  },

  getRunDetail(){
    let runId = this.props.params.id;

    axios.get(`/api/run/${runId}`, {headers: {token: localStorage.getItem("RunAppToken")}})
      .then((response) => {
        if (response.data.success) {
          this.setState({
            id: runId,
            date:  moment(response.data.message.date).format("YYYY-MM-DD"),
            time: Number(response.data.message.time).toFixed(0),
            dist: Number(response.data.message.dist).toFixed(2)
          });
        } else {
          this.setState({warning: response.data.message});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  handleDateChange(evt){
    this.setState({date: evt.target.value});
  },

  handleDistChange(evt){
    this.setState({dist: evt.target.value});
  },

  handleTimeChange(evt){
    this.setState({time: evt.target.value});
  },

  handleSubmit(evt) {
    evt.preventDefault();
    //validate data
    //validate input
    if (!moment(this.state.date, "YYYY-MM-DD").isValid()
        || !moment(this.state.date).isValid()) {
      this.setState({warning: "Please enter a valid date"});
      return;
    }
    if (this.state.dist === "" || Number(this.state.dist) <= 0) {
      this.setState({warning: "Please enter a positive number for distance"});
      return;
    }
    if (this.state.time === "" || Number(this.state.time) <= 0) {
      this.setState({warning: "Please enter a positive number for time"});
      return;
    }

    this.putRun();
  },

  putRun() {
    const runId = this.state.id;
    const updatedRun = {
      date: this.state.date,
      dist: this.state.dist,
      time: this.state.time
    }

    axios.put(`/api/run/${runId}`, updatedRun, {headers: {token: localStorage.getItem("RunAppToken")}})
      .then(response => {
        if (response.data.success) {
          this.props.history.push("/run");
        } else {
          //error from server
          this.setState({warning: response.data.message});
        }
      })
      .catch((err) => console.log(err));
  },

  handleDelete() {
    const runId = this.state.id;
    axios.delete(`/api/run/${runId}`, {headers: {token: localStorage.getItem("RunAppToken")}})
      .then(response => {
        if (response.data.success) {
          this.props.history.push("/run");
        } else {
          //error from server
          this.setState({warning: response.data.message});
        }
      })
      .catch((err) => console.log(err));
  },

  render() {

    return (
        <div>
          <h3>{this.state.compName}</h3>
          <WarningCard warning={this.state.warning} />

          <form>
          <h5>Date</h5>
          <div className="input-field">
            <input type="date" className="datepicker" value={this.state.date} onChange={this.handleDateChange}/>
          </div>


          <h5>Distance (km)</h5>
          <div className="input-field">
            <input value={this.state.dist} onChange={this.handleDistChange}/>
          </div>

          <h5>Time (minutes)</h5>
          <div className="input-field">
            <input value={this.state.time} onChange={this.handleTimeChange}/>
          </div>


          <a href="javascript:;" className="btn blue" onClick={this.handleSubmit}>Submit</a>
          <span>  </span>
          <Link to="/run" className="btn blue">Cancel</Link>
          <span>  </span>
          <a href="javascript:;" className="btn red" onClick={this.handleDelete}>Delete</a>
          </form>
        </div>
    );
  }
});
