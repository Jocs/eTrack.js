/**
 * crete by Jocs 2016.04.24
 */
import React, { Component, PropTypes } from 'react'
import * as appListActionsCreator from '../../actions/applist'
import { push } from 'redux-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Table from 'material-ui/lib/table/table'
import TableHeaderColumn from 'material-ui/lib/table/table-header-column'
import TableRow from 'material-ui/lib/table/table-row'
import TableHeader from 'material-ui/lib/table/table-header'
import TableRowColumn from 'material-ui/lib/table/table-row-column'
import TableBody from 'material-ui/lib/table/table-body'
import Recorder from 'material-ui/lib/svg-icons/action/view-headline'

import './applist.scss'

class Applist extends Component {
	constructor(props) {
		super(props)
	}

	static propTypes = {
		appList: PropTypes.array.isRequired,
		consoleLeftNav: PropTypes.bool.isRequired
	}

	render() {
		const { appList, consoleLeftNav } = this.props
		const style = consoleLeftNav ? {marginLeft: 170} : {marginLeft: 0}
		const children = appList.map((app, i) => {
			return (
				<TableRow key={i}>
					<TableRowColumn>{app.name}</TableRowColumn>
					<TableRowColumn>{app._id}</TableRowColumn>
					<TableRowColumn>{app.url}</TableRowColumn>
				</TableRow>
			)
		})
		return (
			<div className='app-list' style={style}>
				<h2><Recorder style={{verticalAlign: 'bottom'}}/>应用列表</h2>
				<Table selectable={false}>
					<TableHeader>
						<TableRow>
							<TableHeaderColumn>应用名称</TableHeaderColumn>
							<TableHeaderColumn>应用ID</TableHeaderColumn>
							<TableHeaderColumn>网站URL</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody>
						{children}
						{/* <TableRow>
							<TableRowColumn>1</TableRowColumn>
							<TableRowColumn>John Smith</TableRowColumn>
							<TableRowColumn>Employed</TableRowColumn>
						</TableRow> */}
					</TableBody>
				</Table>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { appList } = state
	const { userId, userName, email } = state.auth
	const { consoleLeftNav } = state.console
	return { appList, userId, userName, email, consoleLeftNav }
}

const mapActionToProps = dispatch => {
	return {push, dispatch, ...bindActionCreators(Object.assign({}, appListActionsCreator), dispatch)}
}

export default connect(mapStateToProps, mapActionToProps)(Applist)












