/**
 * crete by Jocs 2016.04.22
 */
import React, { Component, PropTypes } from 'react'
import { push } from 'redux-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as detailActionCreator from '../../actions/detail'

import './index.scss'

class Detail extends Component {
	constructor(props) {
		super(props)
	}

	static propTypes = {
		consoleLeftNav: PropTypes.bool.isRequired,
		params: PropTypes.object,
		fetchDetailErrorIfNeeded: PropTypes.func.isRequired
	}

	componentWillMount() {
		const { fetchDetailErrorIfNeeded } = this.props
		const { id } = this.props.params
		fetchDetailErrorIfNeeded(id)
	}

	render() {
		const { consoleLeftNav } = this.props
		const detailStyle = consoleLeftNav ? {marginLeft: 170} : {marginLeft: 0}
		return (
			<div className='detail' style={detailStyle}>
				hello
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { consoleLeftNav } = state.console
	return { consoleLeftNav }
}

const mapDispatchToProps = dispatch => {
	return {push, dispatch, ...bindActionCreators(Object.assign({}, detailActionCreator), dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
