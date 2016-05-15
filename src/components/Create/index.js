/**
 * crete by Jocs 2016.04.24
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'redux-router'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import Help from 'material-ui/svg-icons/action/help-outline'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'

import * as createActionsCreator from '../../actions/createApp'
import { validateAppName, validateAppUrl, isValidate } from './helper'

import style from './style'

import './index.scss'

class Create extends Component {
	constructor(props) {
		super(props)
		this.handleTextInput = this.handleTextInput.bind(this)
		this.handleCancel = this.handleCancel.bind(this)
		this.handleCreate = this.handleCreate.bind(this)
		this.state = {
			name: '',
			url: '',
			rule: '',
			appNameErrorText: '',
			appUrlErrorText: '',
			dirty: false
		}
	}

	static propTypes = {
		push: PropTypes.func.isRequired,
		dispatch: PropTypes.func.isRequired,
		createApp: PropTypes.func.isRequired,
		userId: PropTypes.string.isRequired
	}

	handleTextInput(event) {
		event.preventDefault()
		const id = event.target.id
		if (id === 'name') {
			this.setState({
				appNameErrorText: validateAppName(event.target.value)
			})
		}
		if (id === 'url') {
			this.setState({
				appUrlErrorText: validateAppUrl(event.target.value)
			})
		}
		this.setState({
			[id]: event.target.value
		}, function() {
			// console.log(this.state)
		})
	}

	handleCancel(event) {
		const { push, dispatch } = this.props
		event.preventDefault()
		dispatch(push('/applist'))
	}

	handleCreate(event) {
		event.preventDefault()
		const { name, url, rule } = this.state
		const { createApp, userId } = this.props
		const appNameErrorText = validateAppName(name)
		const appUrlErrorText = validateAppUrl(url)
		this.setState({
			dirty: true
		})
		this.setState({
			appNameErrorText,
			appUrlErrorText
		}, function() {
			if (isValidate(this.state)) {
				createApp({
					name, url, rule, creator: userId
				})
			}
		})


	}

	render() {
		const { name, url, rule, appNameErrorText, appUrlErrorText, dirty } = this.state
		return (
			<Paper
				className='create-app'
				zDepth={2}
			>
				<h2>创建应用
					<IconButton
						style={style.createHelp}
						tooltip="什么是创建应用？"
						tooltipPosition="top-center"
					>
						<Help />
					</IconButton>
				</h2>
				<TextField
					style={style.nameStyle}
					hintText='应用名称'
					floatingLabelText='应用名称'
					errorText={dirty && appNameErrorText}
					value={name}
					id='name'
					onChange={this.handleTextInput}
				/>
				<TextField
					hintText='eTrack所要检测网站的URL'
					floatingLabelText='eTrack所要检测网站的URL'
					errorText={dirty && appUrlErrorText}
					value={url}
					id='url'
					onChange={this.handleTextInput}
				/>
				<br/>
				<TextField
					style={style.textarea}
					hintText='您的应用想要过滤掉的错误，可不填！'
					floatingLabelText='错误信息中不包含以下字段'
					multiLine={true}
					rows={2}
					rowsMax={4}
					value={rule}
					id='rule'
					onChange={this.handleTextInput}
				/><br/>
				<div className='bottom-buttons'>
					<RaisedButton label='创建'
						secondary={true}
						style={style.bottomButton}
						onClick={this.handleCreate}
					/>
					<RaisedButton label="取消"
						onClick={this.handleCancel}
					/>
				</div>
			</Paper>
		)
	}
}

const mapStateToProps = state => {
	const {
		userId
	} = state.auth
	return { userId }
}

const mapDispatchToProps = dispatch => {
	return {push, dispatch, ...bindActionCreators(Object.assign({}, createActionsCreator), dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Create)

