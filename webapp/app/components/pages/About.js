import React from 'react';

export default React.createClass({
  getRenderParams() {
    let params = {

    }
    return params
  },

  render() {

  	return (
  		<div className="content-wrapper privacy-wrapper">
        <h3>About</h3>
        <p>This is a single page app built with React, Axios, Express, Mongoose and MongoDB</p>
        <p>Ben Hu 2017</p>
  		</div>
  	)
  }
});
