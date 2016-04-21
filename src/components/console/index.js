import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class Console extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (<div>Console Page
 			<Link to='/detail'>Detail</Link>
			{this.props.children}
		</div>)
	}
}
// const Console = props =>
// 	(<div>Console Page
// 		<Link to='/detail'>Detail</Link>
// 		{props.children}
// 	</div>)

export default Console
