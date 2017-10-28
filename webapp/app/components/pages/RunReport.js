import React, { Component } from 'react';
import moment from "moment";
import axios from "axios";

import RunListItem from "./RunListItem";
import WarningCard from "./WarningCard";

export default React.createClass( {

  getInitialState() {
    // super();
    return {
      compName: "Running log",
      runList: [],
      runListFiltered: [],
      warning: "",
      token: localStorage.token
    };
  },

  componentWillMount() {
    //load data before mounting
    this.getRunList();
  },

  getRunList(){
    //load run list from server, sort and deep copy into states
    //fetch(url, config{method, body{}})
    fetch("/api/run_admin/",
          {method: "GET", body: {token : localStorage.token}})
          .then(response => {
            if (response.data.success) {
              let sortedList = response.data.message.sort(
                function compare(a, b) {
                  if (moment(a.date) === moment(b.date)) {
                    return 0;
                  }
                  //latest run logs first
                  if (moment(a.date) > moment(b.date)) {
                    return -1;
                  }
                  return 1;
                }
              );
              this.setState({
                runList: JSON.parse(JSON.stringify(sortedList)),
                runListFiltered: JSON.parse(JSON.stringify(sortedList))
              });
            } else {
              this.setState({warning: response.data.message});
            }
          })
          .catch(error => {
            this.setState({warning: response.data.message});
          });
  },

  handleFilter(evt) {
    //validate filter input, change this.state.runListFiltered
    evt.preventDefault();

    //validate input, control warning message
    if (!moment(this.refs.fromDate.value, "YYYY-MM-DD").isValid()
        || !moment(this.refs.toDate.value, "YYYY-MM-DD").isValid()) {
      this.setState({warning: "Please enter a valid date in YYYY-MM-DD"});
      return;
    }
    if (moment(this.refs.fromDate.value) > moment(this.refs.toDate.value)) {
      this.setState({warning: "From date must be earlier than To date"});
      return;
    }
    this.setState({warning: ""});

    //filter result by date
    let from = moment(this.refs.fromDate.value);
    let to = moment(this.refs.toDate.value);
    let filteredResult = [];
    this.state.runList.forEach(
      function(run) {
        if (moment(run.date) >= from && moment(run.date) <= to) {
          filteredResult.push(run);
        }
      }
    );
    this.setState({runListFiltered: filteredResult});
  },

  handleResetFilter(evt) {
    evt.preventDefault();
    var runCopy = JSON.parse(JSON.stringify(this.state.runList));
    this.setState({runList: runCopy});
  },

  render() {
    const runItems = this.state.runListFiltered.map(
      function(run, index) {
        return (<RunListItem key={run._id} item={run} index={index}/>);
      }
    );

    return(
      <div className="content-wrapper">
        <h3>{this.state.compName}</h3>

        <WarningCard warning={this.state.warning}/>

        <form onSubmit={this.handleFilter.bind(this)}>
          <div className="input-field">
            <p>From date (YYYY-MM-DD)</p>
            <input type="date" name="fromDate" ref="fromDate"/>
          </div>
          <div className="input-field">
            <p>To date (YYYY-MM-DD)</p>
            <input type="date" name="toDate" ref="toDate"/>
          </div>

          <input type="submit" value= "Filter" className="btn red"/>
          <span>  </span>
          <div className="btn blue onclick={this.handleResetFilter}">Reset filter</div>
        </form>
        <br/>
        <table className="striped">
        <tbody>
          <tr>
            <th>#</th>
            <th>Date</th>
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
});
