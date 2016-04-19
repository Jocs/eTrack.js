import React, { Component } from 'react'
import { render } from 'react-dom'

require('./index.scss')

class Like extends Component {
	constructor(props) {
		super(props)
		this.state = {
			like: true
		}
	}
	handleClick(e) {
		this.setState({
			like: !this.state.like
		})
	}
	render() {
		const text = this.state.like ? 'like' : 'dont like'
		return (
			<div className="test" onClick={e => this.handleClick(e)}>
				You {text} this app.
			</div>
		)
	}
}

render(
	<Like />,
	document.querySelector('#root')
)
