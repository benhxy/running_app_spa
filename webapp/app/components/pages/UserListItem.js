import React, { Component } from 'react';
import {Link} from "react-router";


export default React.createClass(  {

  render() {
    return (

        <tr>
          <td>
            <Link to={`/user/${this.props.item._id}`}>
              #{this.props.index + 1}
            </Link>
          </td>
          <td>{this.props.item.name}</td>
          <td>{this.props.item.password}</td>
          <td>{this.props.item.role}</td>
          <td>{new Date(this.props.item.date_of_register).toDateString()}</td>
        </tr>

    );
  }
});
