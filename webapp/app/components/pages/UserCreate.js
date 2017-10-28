import React, { Component } from 'react';
import axios from "axios";
import WarningCard from "./WarningCard";

export default React.createClass( {

  getInitialState() {
    return {
      compName: "Create new user account",
      warning: "",
    }
  },

  postSignup(signupData) {
    axios.post("/api/user/", signupData, {headers: {token: localStorage.getItem("RunAppToken")}})
      .then(response => {
        if (response.data.success) {
          this.props.history.push("/user");
        } else {
          this.setState({warning: response.data.message});
        }
      })
      .catch((err) => console.log(err));
  },

  handleSubmit(evt) {
    evt.preventDefault();

    if (this.refs.name.value == "" || this.refs.password.value == "" || this.refs.role.value == "") {
      this.setState({warning: "Please enter name, password and role"});
      return;
    }

    if (this.refs.role.value != "user" && this.refs.role.value != "userManager" && this.refs.role.value != "admin") {
      this.setState({warning: "Please use user, admin or userManager role"});
      return;
    }

    const signupData = {
      name: this.refs.name.value,
      password: this.refs.password.value,
      role: this.refs.role.value
    };
    this.postSignup(signupData);
  },

  render() {
    return (
        <div>
          <h3>{this.state.compName}</h3>

          <WarningCard warning={this.state.warning} />

          <form onSubmit={this.handleSubmit}>

            <h5>Username</h5>
            <div className="input-field">
              <input type="text" name="name" ref="name"/>
            </div>

            <h5>Password</h5>
            <div className="input-field">
              <input type="password" name="password" ref="password"/>
            </div>

            <h5>Role</h5>
            <div className="input-field">
              <input type="text" name="role" ref="role"/>
            </div>

            <input type="submit" value= "Sign up" className="btn red"/>
            <span>  </span>
            <input type="reset" value= "Reset" className="btn blue"/>

          </form>
        </div>
    );
  }
});
