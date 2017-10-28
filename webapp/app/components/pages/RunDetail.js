import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import moment from "moment";

import WarningCard from "./WarningCard";

class RunItemDetail extends Component {

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
  }

  componentWillMount() {
    this.getRunDetail();
  }

  getRunDetail(){
    let runId = this.props.match.params.id;

    axios.get(`/api/run_admin/${runId}`, {crossdomain: true})
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
  }

  handleDateChange(evt){
    this.setState({date: evt.target.value});
  }

  handleDistChange(evt){
    this.setState({dist: evt.target.value});
  }

  handleTimeChange(evt){
    this.setState({time: evt.target.value});
  }

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
  }

  putRun() {
    const runId = this.state.id;
    const updatedRun = {
      date: this.state.date,
      dist: this.state.dist,
      time: this.state.time
    }

    axios.put(`/api/run_admin/${runId}`, updatedRun, {crossdomain: true})
      .then(response => {
        if (response.data.success) {
          this.props.history.push("/run");
        } else {
          //error from server
          this.setState({warning: response.data.message});
        }
      })
      .catch((err) => console.log(err));
  }

  handleDelete() {
    const runId = this.state.id;
    axios.delete(`/api/run_admin/${runId}`, {crossdomain: true})
      .then(response => {
        if (response.data.success) {
          this.props.history.push("/run");
        } else {
          //error from server
          this.setState({warning: response.data.message});
        }
      })
      .catch((err) => console.log(err));
  }

  render() {

    return (
        <div>
          <h3>{this.state.compName}</h3>
          <WarningCard warning={this.state.warning} />
          <h5>Date</h5>

          <input type="text" className="datepicker" value={this.state.date} onChange={this.handleDateChange.bind(this)}/>

          <h5>Distance (km)</h5>
          <input value={this.state.dist} onChange={this.handleDistChange.bind(this)}/>

          <h5>Time (minutes)</h5>
          <input value={this.state.time} onChange={this.handleTimeChange.bind(this)}/>


          <div className="btn blue" onClick={this.handleSubmit.bind(this)}>Submit</div>
          <span>  </span>
          <Link to="/run" className="btn blue">Cancel</Link>
          <span>  </span>
          <div className="btn red" onClick={this.handleDelete.bind(this)}>Delete</div>
        </div>
    );
  }
}

export default RunItemDetail;
