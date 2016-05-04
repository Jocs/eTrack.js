/**
 * crete by Jocs 2016.04.24
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'redux-router'

import * as currentActionCreator from '../../actions/current'
import * as loadActionCreator from '../../actions/loading'

import Toggle from 'material-ui/lib/toggle'
import Refresh from 'material-ui/lib/svg-icons/navigation/refresh'

import AppSelector from '../AppSelector'
import Table from '../CurrentTable'
import style from './style'

import './index.scss'

class Current extends Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.handleToggle = this.handleToggle.bind(this)
		this.handleRefreshClick = this.handleRefreshClick.bind(this)
	}

	static propTypes = {
		appList: PropTypes.array.isRequired,
		currentApp: PropTypes.object,
		selectAppAndUpdateList: PropTypes.func.isRequired,
		toggleLoadingStatus: PropTypes.func.isRequired,
		autoRefresh: PropTypes.bool.isRequired,
		toggleAutoRefresh: PropTypes.func.isRequired,
		currentErrorList: PropTypes.array,
		consoleLeftNav: PropTypes.bool.isRequired,
		fetchCurrentErrorList: PropTypes.func.isRequired
	}
	handleChange = value => {
		const { appList, selectAppAndUpdateList } = this.props
		appList.forEach(app => {
			if (app._id === value) selectAppAndUpdateList(app)
		})
	}

	handleToggle(event) {
		const { toggleAutoRefresh, fetchCurrentErrorList, currentApp } = this.props
		toggleAutoRefresh(event.target.checked)
		event.target.checked && fetchCurrentErrorList(currentApp._id)
	}

	handleRefreshClick(event) {
		event.preventDefault()
		const { fetchCurrentErrorList, currentApp } = this.props
		fetchCurrentErrorList(currentApp._id)
	}

	componentDidMount() {
		const { currentApp, toggleLoadingStatus } = this.props
		if (currentApp === null) toggleLoadingStatus('loading')
	}

	componentWillReceiveProps(nextProps) {
		const { currentApp, toggleLoadingStatus } = nextProps
		const lastCurrent = this.props.currentApp
		if (currentApp !== null && lastCurrent === null) toggleLoadingStatus('hide')
	}

	render() {
		const { appList, currentApp, autoRefresh, currentErrorList, consoleLeftNav } = this.props
		const currentStyle = consoleLeftNav ? {marginLeft: 170} : {marginLeft: 0}
		return (
			<div className='current' style={currentStyle}>
				{currentApp && <AppSelector
					items={appList}
					current={currentApp}
					onChange={this.handleChange}
				/>}
				<div>
					<div className='toggle'>
						<Toggle
							style={style.toggle}
							label='自动更新'
							labelPosition='right'
							onToggle={this.handleToggle}
						/>
					</div>
					{!autoRefresh && <Refresh style={style.refresh}
						onClick={this.handleRefreshClick}
					/>}
				</div>
				{currentApp && <Table
					list={currentErrorList}
				/>}
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { appList } = state
	const { currentApp, currentErrorList, autoRefresh } = state.current
	const { consoleLeftNav } = state.console
	return { appList, currentApp, currentErrorList, autoRefresh, consoleLeftNav }
}

const mapDispatchToProps = dispatch => {
	return {push, dispatch, ...bindActionCreators(Object.assign({}, currentActionCreator, loadActionCreator), dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Current)
