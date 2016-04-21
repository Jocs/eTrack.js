/**
 * create by Jocs 2016.04.22
 */
import React, { Component, PropTypes } from 'react'
import Dialog from 'material-ui/lib/dialog'
import RaisedButton from 'material-ui/lib/raised-button'
import TextField from 'material-ui/lib/text-field'

import './index.scss'

export default class Login extends Component {
	constructor(props) {
		super(props)
		this.handleCancel = this.handleCancel.bind(this)
		this.handleChangeLoginPanel = this.handleChangeLoginPanel.bind(this)
		this.handleBackLogin = this.handleBackLogin.bind(this)
	}
	static propTypes = {
		loginPanel: PropTypes.string.isRequired,
		toggleLoginPanel: PropTypes.func.isRequired
	}
	handleCancel(event) {
		event.preventDefault()
		this.props.toggleLoginPanel('hidden')
	}

	handleChangeLoginPanel(event) {
		event.preventDefault()
		this.props.toggleLoginPanel('signup')
	}

	handleBackLogin(event) {
		event.preventDefault()
		this.props.toggleLoginPanel('login')
	}
	render() {
		const { loginPanel } = this.props

		const tittleStyle = {
			color: 'rgb(0, 188, 212)',
			textAlign: 'center'
		}
		const contentStyle = {
			width: 300
		}
		const actionsContainerStyle = {
			textAlign: 'center'
		}

		const actions = [
			<RaisedButton
				label={loginPanel}
				secondary={true}
				keyboardFocused={true}
				style={{marginRight: 50}}
			/>, <RaisedButton
				label='Cancel'
				primary={true}
				keyboardFocused={true}
				onMouseDown={this.handleCancel}
			/>
		]

		const loginToSignup = loginPanel === 'login' ?
			(<div className='et-login-to-signup'>
				没有eTrack账号？那就
				<a href='javascript:;'
					onClick={this.handleChangeLoginPanel}
				>注册</a>一个吧!
			</div>) : (<div className='et-login-to-signup'>
				返回<a href='javascript:;'
					onClick={this.handleBackLogin}
				>登陆</a>
			</div>)

		return (
			<div>
				<Dialog
					title={loginPanel === 'login' ? '登陆 eTrack.Js' : '注册 eTrack.Js'}
					actions={actions}
					modal={false}
					open={loginPanel !== 'hidden'}
					titleStyle={tittleStyle}
					contentStyle={contentStyle}
					actionsContainerStyle={actionsContainerStyle}
				>
					<TextField
						hintText="请输入您的邮箱地址"
						floatingLabelText="Email Address"
					/><br/>
					<TextField
						hintText="请输入您的密码"
						floatingLabelText="Password"
						type='password'
					/><br/>
					{ loginToSignup }
				</Dialog>
			</div>
		)
	}
}

