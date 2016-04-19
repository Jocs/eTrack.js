import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

const Nav = props => {
	return (
		<ul>
			<li><Link to="/">eTrack</Link></li>
			<li><Link to="/console">Console</Link></li>
		</ul>
	)
}

export default Nav
