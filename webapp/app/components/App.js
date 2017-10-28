import React from 'react'
import { Link, browserHistory } from 'react-router'
import fetch from '../utils/fetch'
let _ = require('lodash')

require('../../css/app.scss')

const App = React.createClass({
  render() {
    return (
      <div>
          <div className="content-container">{React.cloneElement(this.props.children)}</div>
      </div>
    )
  }
})

export default App

