import React, { Component } from 'react';
import axios from "axios";
import moment from "moment";

import UserListItem from "./UserListItem";
import WarningCard from "./WarningCard";

class UserListAdmin extends Component {

  constructor() {
    super();
    this.state = {
      compName: "Manage users",
      userList: [],
      warning: ""
    };
  }

  componentWillMount() {
    //load data before mounting
    this.getUserList();
  }

  getUserList(){
    //load run list from server, sort and deep copy into states
    axios.post("/api/user/", {token: localStorage.getItem("RunAppToken"), action: "GET"}, {crossdomain: true})
      .then((response) => {
        if (response.data.success) {
          this.setState({
           userList: response.data.message)
          });
        } else {
          this.setState({warning: response.data.message});
        }
      })
      .catch((err) => {
        this.setState({warning: JSON.stringify(err)});
      });
  }

  render() {
    const userItems = this.state.userList.map(
      function(user, index) {
        return (<UserListItem key={user._id} item={user} index={index}/>);
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
}

export default UserListAdmin;
