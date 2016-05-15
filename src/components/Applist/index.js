/**
 * crete by Jocs 2016.04.24
 */
import React, { Component, PropTypes } from 'react'
import * as appListActionsCreator from '../../actions/applist'
import { push } from 'redux-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
	Table,
	TableRow,
	TableHeader,
	TableHeaderColumn,
	TableRowColumn,
	TableBody
} from 'material-ui/Table'


import Recorder from 'material-ui/svg-icons/action/view-headline'
import Delete from 'material-ui/svg-icons/action/delete'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Warn from 'material-ui/svg-icons/alert/error-outline'


import './applist.scss'
import styles from './style'

class Applist extends Component {
	constructor(props) {
		super(props)
		this.handleClose = this.handleClose.bind(this)
		this.handleOpen = this.handleOpen.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.state = {
			open: false,
			preToDeleteAppId: ''
		}
	}

	static propTypes = {
		appList: PropTypes.array.isRequired,
		consoleLeftNav: PropTypes.bool.isRequired,
		deleteApplication: PropTypes.func.isRequired,
		userId: PropTypes.string.isRequired,
		push: PropTypes.func.isRequired,
		dispatch: PropTypes.func.isRequired
	}

	handleClose() {
		this.setState({
			preToDeleteAppId: ''
		}, () => {
			this.setState({
				open: false
			})
		})
	}

	handleOpen(event, appId) {
		event.preventDefault()
		this.setState({
			preToDeleteAppId: appId
		}, () => {
			this.setState({open: true})
		})
	}

	handleDelete() {
		const { deleteApplication, userId } = this.props
		deleteApplication(userId, this.state.preToDeleteAppId)
		this.handleClose()
	}

	render() {
		const { appList, consoleLeftNav, push, dispatch } = this.props
		const style = consoleLeftNav ? {marginLeft: 170} : {marginLeft: 0}
		const children = appList.map((app, i) => {
			return (
				<TableRow key={i}>
					<TableRowColumn>{app.name}</TableRowColumn>
					<TableRowColumn>{app._id}</TableRowColumn>
					<TableRowColumn>{app.url}</TableRowColumn>
					<TableRowColumn>
						<Edit style={styles.edit}
							color='lightgreen'
						/>
						<Delete
							style={styles.delete}
							color='orange'
							onClick={event => this.handleOpen(event, app._id)}
						/>
					</TableRowColumn>
				</TableRow>
			)
		})

		const actions = [
			<FlatButton
				label='取消'
				secondary={true}
				onMouseDown={this.handleClose}
			/>,
			<FlatButton
				label='确定'
				primary={true}
				onMouseDown={this.handleDelete}
			/>
		]

		return (
			<div className='app-list' style={style}>
				<h2>
					<Recorder
						style={{verticalAlign: 'bottom'}}
						color='#666'
					/>
					共{appList.length}个应用
				</h2>
				<FlatButton
					label='创建应用'
					labelPosition='before'
					secondary={true}
					style={styles.floatButton}
					onClick={event => dispatch(push('createApp'))}
				/>
				<Table selectable={false}>
					<TableHeader>
						<TableRow>
							<TableHeaderColumn>应用名称</TableHeaderColumn>
							<TableHeaderColumn>应用ID</TableHeaderColumn>
							<TableHeaderColumn>网站URL</TableHeaderColumn>
							<TableHeaderColumn>编辑／删除</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody>
						{children}
					</TableBody>
				</Table>
				<Dialog
					title='确定删除应用吗？'
					actions={actions}
					modal={false}
					open={this.state.open}
					titleStyle={styles.title}
					contentStyle={styles.content}
					onRequestClose={this.handleClose}
				>
					<Warn
						style={styles.warn}
						color='orange'
					/>应用将不再列表显示，该应用的相关数据将永久删除。
				</Dialog>
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
