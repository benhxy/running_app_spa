import React, { Component } from 'react';
import {Link} from "react-router-dom";


class UserListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      index: this.props.index
    }
  }


  render() {
    const item = this.state.item;

    return (

        <tr>
          <td>
            <Link to={`/user/${item._id}`}>
              #{this.state.index + 1}
            </Link>
          </td>
          <td>{item.name}</td>
          <td>{item.password}</td>
          <td>{item.role}</td>
          <td>{new Date(item.date_of_register).toDateString()}</td>
        </tr>

    );
  }
}

export default UserListItem;
