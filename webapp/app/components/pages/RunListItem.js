import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default React.createClass({

  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      index: this.props.index
    }
  },


  render() {
    const item = this.state.item;

    return (
        <tr>
          <td>
            <Link to={`/run/${item._id}`}>
              #{this.state.index + 1}
            </Link>
          </td>
          <td>{new Date(item.date).toDateString()}</td>
          <td>{Number(item.dist).toFixed(2)}</td>
          <td>{Number(item.time).toFixed(0)}</td>
          <td>{Number(item.speed).toFixed(2)}</td>
        </tr>
    );
  }
});
