import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import './index.scss'

const Nav = props => {
	return (
		<ul>
			<li><Link to="/" onlyActiveOnIndex={true} activeClassName="active">eTrack</Link></li>
			<li><Link to="/console" activeStyle={{color: 'blue'}}>Console</Link></li>
		</ul>
	)
}

export default Nav
