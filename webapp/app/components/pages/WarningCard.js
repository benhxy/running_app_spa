import React, { Component } from 'react';

export default React.createClass({

  constructor(props) {
    super(props);
  },

  render() {
    if (this.props.warning === "") {
      return (
        <div>
        </div>
      );
    } else {
      return(
        <div className="card red">
          <div className="card-content white-text">
            {this.props.warning}
          </div>
        </div>
      );
    }
  }
});
