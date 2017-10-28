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
    let userId = this.props.params.id;
    console.log(userId);

    axios.get(`/api/user/${userId}`, {headers:{token: localStorage.getItem("RunAppToken")}})
      .then((response) => {

        console.log(response.data);

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
    if (this.state.name == "") {
      this.setState({warning: "Please enter a valid name"});
      return;
    }
    if (this.state.password == "") {
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
      name: this.state.name,
      password: this.state.password,
      role: this.state.role
    }

    axios.put(`/api/user/${userId}`, updatedUser, {headers:{token: localStorage.getItem("RunAppToken")}})
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

  handleDelete() {
    const userId = this.state.id;
    axios.delete(`/api/user/${userId}`, {headers:{token: localStorage.getItem("RunAppToken")}})
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
          <form>
          <h5>User name</h5>
          <div className="input-field">
            <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
          </div>

          <h5>Password</h5>
          <div className="input-field">
            <input type="text" value={this.state.password} onChange={this.handlePasswordChange}/>
          </div>

          <h5>Role</h5>
          <div className="input-field">
            <input type="text" value={this.state.role} onChange={this.handleRoleChange}/>
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
