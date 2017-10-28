import React from 'react'
import { Link, browserHistory } from 'react-router'
import fetch from '../utils/fetch'
let _ = require('lodash')

require('../../css/app.scss')

const App = React.createClass({

  getRenderParams(){
    let currentLink = this.props.location.pathname;
    let params = {
      containerCls: 'container ' + (this.props.params.lang == 'tc' ? 'tc' : 'sc'),
      sclink: this.props.params.lang == 'tc' ? currentLink.substring(3) : currentLink,
      tclink: this.props.params.lang == 'tc' ? currentLink : (this.props.location.pathname == '/' ? '/tc' : '/tc'+currentLink),
      year: new Date().getFullYear(),
      homeLink: this.props.params.lang == 'tc' ? '/tc' : '/',
      wrapperCls: (currentLink == '/' || currentLink == '/tc') ? 'wrapper home-outer-wrapper' : 'wrapper'
    }

    return params
  },

  render() {
    let params = this.getRenderParams()
    return (
      <div className={params.containerCls}>
        <div className={params.wrapperCls}>
          <div className="header-container">
            <Link to={params.homeLink} className="logo-container">孤君</Link>
            <div className="slogan-container">
              <div className="sc-text">寻找非比寻常，追求独特创新</div>
              <div className="tc-text">尋找非比尋常，追求獨特創新</div>
            </div>
            <div className="lang-container">
              <Link to={params.sclink} className="header-lang-btn header-lang-sc">简体</Link>
              |
              <Link to={params.tclink} className="header-lang-btn header-lang-tc">繁體</Link>
            </div>
          </div>
          <div className="content-container">{React.cloneElement(this.props.children)}</div>
        </div>
        <div className="footer-container">
          <div className="sc-text">孤君 版权所有 © {params.year} <Link to="/privacy" className="footer-link">隐私权政策</Link></div>
          <div className="tc-text">孤君 版權所有 © {params.year} <Link to="/privacy" className="footer-link">隱私權政策</Link></div>
        </div>
      </div>
    )
  }
})

export default App

