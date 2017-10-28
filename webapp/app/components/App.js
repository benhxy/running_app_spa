import React from 'react'
import { Link, browserHistory } from 'react-router'
import fetch from '../utils/fetch'
let _ = require('lodash')

require('../../css/app.scss')

const App = React.createClass({
  getInitialState() {
    return {
      roleName: "",
      ifLogin: false,
      showMenu: false
    }
  },

  componentDidMount() {
    this.setState({roleName: localStorage.getItem('RunAppRole'), ifLogin: localStorage.getItem('RunAppToken') ? true : false});
  },

  componentWillReceiveProps() {
  	this.setState({showMenu: false});
  },

  toggleMenu() {
  	this.setState({showMenu: !this.state.showMenu});
  },

  render() {
    return (
      <div className="container">
      	<div className="header-container">
      		<a href="javascript:;" className="menu-btn" onClick={this.toggleMenu}><span className="menu-btn-line"></span></a>
      		<Link className="title" to="/" className="title-text">Run App</Link>
      		<div className="clearfix"></div>
      	</div>
      	<div className={"menu-container " + (this.state.showMenu ? "show" : "")}>
			<div className="menu-bg" onClick={this.toggleMenu}></div>
			<ul className="menu-list">
				<li className="menu-item">
					{this.state.ifLogin ? <Link to="/" className="menu-link">Add a running record</Link> : <span></span>}
				</li>
				<li className="menu-item">
					{this.state.ifLogin ? <Link to="/" className="menu-link">Running records</Link> : <span></span>}
				</li>
				<li className="menu-item">
					{this.state.ifLogin ? <Link to="/" className="menu-link">Running report</Link> : <span></span>}
				</li>
				<li className="menu-item">
					{this.state.roleName == "admin" ? <Link to="/run_admin" className="menu-link">Manage records as Admin</Link> : <span></span>}
				</li>
				<li className="menu-item">
					{this.state.roleName == "admin" ? <Link to="/user" className="menu-link">Manage users as Admin</Link> : (this.state.roleName == "userManager" ? <Link to="/" className="menu-link">Manage users as Admin</Link> : <span></span>)}
				</li>
				<li className="menu-item">
					<Link to="/about" className={"menu-link " + (this.props.location.pathname == "/about" ? "current" : "")}>About</Link>
				</li>
				<li className="menu-item">
					{this.state.ifLogin ? <Link to="/logout" className="menu-link">Logout</Link> : <span></span>}
				</li>
				<li className="menu-item">
					{this.state.ifLogin ? <span></span> : <Link to="/login" className={"menu-link " + (this.props.location.pathname == "/login" ? "current" : "")}>Login</Link>}
				</li>
				<li className="menu-item">
					{this.state.ifLogin ? <span></span> : <Link to="/signup" className={"menu-link " + (this.props.location.pathname == "/signup" ? "current" : "")}>Sign up</Link>}
				</li>
			</ul>
        </div>
        <div className="content-container">{React.cloneElement(this.props.children)}</div>
      </div>
    )
  }
})

export default App
