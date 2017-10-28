import React, { Component } from 'react';
import moment from "moment";
import axios from "axios";

import RunListItem from "./RunListItem";
import WarningCard from "./WarningCard";

export default React.createClass( {

  getInitialState() {
    // super();
    return {
      compName: "Weekly report",
      runReportList: [],
      warning: "",
    };
  },

  componentWillMount() {
    //load data before mounting
    this.getRunReport();
  },

  getRunReport(){
    //load run list from server, sort and deep copy into states
    //fetch(url, config{method, body{}})
    axios.post("/api/run/report",
              {token : localStorage.getItem("RunAppToken"),
               action: "GET"},
              {crossdomain: true})
      .then(response => {
        if (response.data.success) {
          this.setState({runReportList: response.data.message});
        } else {
          this.setState({warning: response.data.message});
        }
      })
      .catch(error => {
        this.setState({warning: response.data.message});
      });
  },

  render() {
    const runItems = this.state.runReportList.map((run, index) => {
      return (
        <tr key={index}>
          <td>#{index + 1}</td>
          <td>{run.week}</td>
          <td>{Number(run.dist).toFixed(2)}</td>
          <td>{Number(run.time).toFixed(0)}</td>
          <td>{Number(run.speed).toFixed(2)}</td>
        </tr>
      );
    });

    return(
      <div className="content-wrapper">
        <h3>{this.state.compName}</h3>
        <WarningCard warning={this.state.warning}/>
        <table className="striped">
        <tbody>
          <tr>
            <th>#</th>
            <th>Week</th>
            <th>Distance (km)</th>
            <th>Time (min)</th>
            <th>Speed (km/h)</th>
          </tr>
          {runItems}
        </tbody>
        </table>
      </div>
    );
  }
})
