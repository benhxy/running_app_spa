import React, { Component } from 'react';
import {Link} from "react-router";

export default React.createClass({
//
  render() {
    return (
        <tr>
          <td>
            <Link to={`/run_admin/${this.props.item._id}`}>
              #{this.props.index + 1}
            </Link>
          </td>
          <td>{this.props.item.user}</td>
          <td>{new Date(this.props.item.date).toDateString()}</td>
          <td>{Number(this.props.item.dist).toFixed(2)}</td>
          <td>{Number(this.props.item.time).toFixed(0)}</td>
          <td>{Number(this.props.item.speed).toFixed(2)}</td>

        </tr>
    );
  }
});
