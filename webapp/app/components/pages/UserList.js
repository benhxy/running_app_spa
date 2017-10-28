import React, { Component } from 'react';
import axios from "axios";
import moment from "moment";

import UserListItem from "./UserListItem";
import WarningCard from "./WarningCard";

export default React.createClass(  {

  getInitialState() {
    return {
      compName: "Manage users",
      userList: [],
      warning: ""
    };
  },

  componentWillMount() {
    //load data before mounting
    this.getUserList();
  },

  getUserList(){
    //load run list from server, sort and deep copy into states
    axios.get("/api/user/", {headers:{token: localStorage.getItem("RunAppToken")}})
      .then((response) => {
        if (response.data.success) {
          let sortedList = response.data.message.sort(
            function compare(a, b) {
              if (a.name == b.name) {
                return 0;
              }
              //latest run logs first
              if (a.name < b.name) {
                return -1;
              }
              return 1;
            }
          );
          this.setState({userList: sortedList});
        } else {
          this.setState({warning: response.data.message});
        }
      })
      .catch((err) => {
        this.setState({warning: JSON.stringify(err)});
      });
  },

  render() {
    const userItems = this.state.userList.map(
      function(item, index) {
        return (<UserListItem key={item._id} item={item} index={index}/>);
      }
    );

    return(
      <div className="content-wrapper">
        <h3>{this.state.compName}</h3>

        <WarningCard warning={this.state.warning}/>

        <table className="striped">
        <tbody>
          <tr>
            <th>#</th>
            <th>User name</th>
            <th>Password</th>
            <th>Role</th>
            <th>Registered on</th>
          </tr>
          {userItems}
        </tbody>
        </table>
      </div>
    );
  }
});
