import React, { Component } from 'react';
import {Link} from "react-router";
import axios from "axios";

import WarningCard from "./WarningCard";

export default React.createClass(  {

   getInitialState() {
    return {
      compName: "User details",
      id: "",
      name: "",
      password: "",
      role: "",
      warning: ""
    }
  },

  componentWillMount() {
    this.getUserDetail();
  },

  getUserDetail(){
    let userId = this.props.match.params.id;

    axios.post(`/api/user/${userId}`, {token: localStorage.getItem("RunAppToken"), action: "GET"}, {crossdomain: true})
      .then((response) => {
        if (response.data.success) {
          this.setState({
            id: userId,
            name: response.data.message.name,
            password: response.data.message.password,
            role: response.data.message.role,
          });
        } else {
          this.setState({warning: response.data.message});
        }
      })
      .catch((err) => {
        this.setState({warning: err});
      });
  },

  handleNameChange(evt){
    this.setState({name: evt.target.value});
  },

  handlePasswordChange(evt){
    this.setState({password: evt.target.value});
  },

  handleRoleChange(evt){
    this.setState({role: evt.target.value});
  },

  handleSubmit(evt) {
    evt.preventDefault();
    //validate data
    //validate input
    if (this.state.name === "") {
      this.setState({warning: "Please enter a valid name"});
      return;
    }
    if (this.state.password === "") {
      this.setState({warning: "Please enter a password"});
      return;
    }
    if (this.state.role !== "user" && this.state.role !== "userManager" && this.state.role !== "admin") {
      this.setState({warning: "Please enter a role from user, userManager or admin"});
      return;
    }

    this.putUser();
  },

  putUser() {
    const userId = this.state.id;
    const updatedUser = {
      date: this.state.date,
      dist: this.state.dist,
      time: this.state.time,
      token: localStorage.getItem("RunAppToken")
    }

    axios.put(`/api/user/${userId}`, updatedUser, {crossdomain: true})
      .then(response => {
        if (response.data.success) {
          this.setState({warning: response.data.message});
        } else {
          //error from server
          this.setState({warning: response.data.message});
        }
      })
      .catch((err) => {
        this.setState({warning: err});
      });
  },

  handleDelete() {
    const userId = this.state.id;
    axios.delete(`/api/run_admin/${userId}`, {crossdomain: true})
      .then(response => {
        if (response.data.success) {
          this.props.history.push("/user");
        } else {
          //error from server
          this.setState({warning: response.data.message});
        }
      })
      .catch((err) => {
        this.setState({warning: err});
      });
  },

  render() {
    return (
        <div>
          <h3>{this.state.compName}</h3>

          <WarningCard warning={this.state.warning} />

          <h5>User name</h5>
          <input type="text" value={this.state.name} onChange={this.handleNameChange}/>

          <h5>Password</h5>
          <input type="text" value={this.state.password} onChange={this.handlePasswordChange}/>

          <h5>Role</h5>
          <input type="text" value={this.state.role} onChange={this.handleRoleChange}/>


          <div className="btn blue" onClick={this.handleSubmit}>Submit</div>
          <span>  </span>
          <Link to="/run" className="btn blue">Cancel</Link>
          <span>  </span>
          <div className="btn red" onClick={this.handleDelete}>Delete</div>
        </div>
    );
  }
});
