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
    axios.post("/api/auth/signup/", signupData, {crossdomain: true})
      .then(response => {
        if (response.data.success) {
          localStorage.setItem("RunAppToken", response.data.token);
          localStorage.setItem("RunAppRole", response.data.role);
          localStorage.setItem("RunAppUserId", response.data.user);
          this.props.history.push("/run");
        } else {
          this.setState({warning: response.data.message});
        }
      })
      .catch((err) => console.log(err));
  },

  handleSubmit(evt) {
    evt.preventDefault();
    const signupData = {
      name: this.refs.name.value,
      password: this.refs.password.value
    };
    this.postSignup(signupData);
  },

  render() {
    return (
        <div>
          <h3>{this.state.compName}</h3>

          <WarningCard warning={this.state.warning} />

          <form onSubmit={this.handleSubmit.bind(this)}>

            <h5>Username</h5>
            <div className="input-field">
              <input type="text" name="name" ref="name"/>
            </div>

            <h5>Password</h5>
            <div className="input-field">
              <input type="password" name="password" ref="password"/>
            </div>

            <input type="submit" value= "Sign up" className="btn red"/>
            <span>  </span>
            <input type="reset" value= "Reset" className="btn blue"/>

          </form>
        </div>
    );
  }
});
