import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { ReduxRouter } from 'redux-router'
import routes from '../routes'

export default class Root extends Component {
	static propTypes = {
		store: PropTypes.object.isRequired
	}

	render() {
		return (
			<Provider store={this.props.store}>
				<ReduxRouter>{routes}</ReduxRouter>
			</Provider>
		)
	}
}
