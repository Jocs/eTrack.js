import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
// class Home extends Component {
// 	static contextTypes: {
// 		router: PropTypes.object.isRequired
// 	}
// 	constructor(props) {
// 		super(props)
// 		this.handleClick = this.handleClick.bind(this)
// 	}

// 	handleClick(e) {
// 		e.preventDefault()
// 		browserHistory.push('console')
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<button onClick={this.handleClick}></button>
// 			</div>
// 		)
// 	}
// }

const Home = (props, context) => {
	const handleClick = e => context.router.push('/console')
	return (
		<div>
			<button onClick={handleClick}>button</button>
		</div>
	)
}
Home.contextTypes = {
	router: PropTypes.object.isRequired
}

export default Home
