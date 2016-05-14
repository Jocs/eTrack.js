/**
 * create by Jocs 2016.04.22
 */
import React, { Component, PropTypes } from 'react'
import Dialog from 'material-ui/lib/dialog'
import RaisedButton from 'material-ui/lib/raised-button'
import TextField from 'material-ui/lib/text-field'

import {
	validateUserName,
	validateEmail,
	validatePassword,
	validate,
	canISignupOrLogin,
	signup,
	login
} from './validate'

import './index.scss'

export default class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userName: '',
			userNameErrorText: '',
			email: '',
			emailErrorText: '',
			password: '',
			passwordErrorText: '',
			showErrorText: false
		}
		this.handleCancel = this.handleCancel.bind(this)
		this.handleChangeLoginPanel = this.handleChangeLoginPanel.bind(this)
		this.handleBackLogin = this.handleBackLogin.bind(this)
		this.handleTextFieldChange = this.handleTextFieldChange.bind(this)
		this.handleSignupOrLogin = this.handleSignupOrLogin.bind(this)
	}
	static propTypes = {
		loginPanel: PropTypes.string.isRequired,
		toggleLoginPanel: PropTypes.func.isRequired,
		singupSuccess: PropTypes.func.isRequired,
		dispatch: PropTypes.func.isRequired,
		push: PropTypes.func.isRequired,
		getAppList: PropTypes.func.isRequired
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
	// 处理输入框变化
	handleTextFieldChange(event) {
		event.preventDefault()
		const id = event.target.id
		const value = event.target.value
		const ErrorText = validate(id, value)

		this.setState({
			[id]: value,
			[`${id}ErrorText`]: ErrorText
		}, function() {
			// console.log(this.state)
		})
	}
	//  处理注册或者登陆
	handleSignupOrLogin(event) {
		event.preventDefault()
		const {userName, email, password} = this.state
		const { loginPanel, singupSuccess, toggleLoginPanel, dispatch, push, getAppList } = this.props
		const userNameErrorText = validateUserName(userName)
		const emailErrorText = validateEmail(email)
		const passwordErrorText = validatePassword(password)

		if (loginPanel === 'signup') {
			this.setState({
				userNameErrorText,
				emailErrorText,
				passwordErrorText
			}, () => {
				this.setState({showErrorText: true})
				if (canISignupOrLogin(loginPanel, this.state)) {
					// 处理注册
					signup({
						userName,
						email,
						password
					})
					.then(data => {
						if (data.code === 1) {
							singupSuccess(data.data)
							toggleLoginPanel('hidden')
						} else {
							this.setState({emailErrorText: data.err.errors.email.message})
						}
					})
					.catch(error => console.log(error))
				}
			})
		} else {
			this.setState({
				emailErrorText,
				passwordErrorText
			}, () => {
				this.setState({showErrorText: true})
				if (canISignupOrLogin(loginPanel, this.state)) {
					// 处理登陆
					login({
						email,
						password
					})
					.then(data => {
						if (data.code === 1) {
							singupSuccess(data.data)
							getAppList(data.data._id)
							toggleLoginPanel('hidden')
							dispatch(push('/dashboard'))
						} else {
							switch (data.error.field) {
								case 'password': {
									this.setState({passwordErrorText: data.error.message})
									break
								}
								case 'email': {
									this.setState({emailErrorText: data.error.message})
									break
								}
							}
						}
					})
					.catch(error => console.log(error))
				}
			})
		}
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
				onMouseDown={this.handleSignupOrLogin}
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
				已有eTrack账号？返回<a href='javascript:;'
					onClick={this.handleBackLogin}
				>登陆</a>
			</div>)

		const userName = loginPanel === 'signup' ?
			(<TextField
				hintText='请输入用户名'
				errorText={this.state.showErrorText && this.state.userNameErrorText }
				floatingLabelText='User Name'
				value={this.state.userName}
				id='userName'
				onChange={this.handleTextFieldChange}
			/>) : null

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
					{ userName }
					<TextField
						hintText='请输入您的邮箱地址'
						errorText={this.state.showErrorText && this.state.emailErrorText }
						floatingLabelText='Email Address'
						value={this.state.email}
						id='email'
						onChange={this.handleTextFieldChange}
					/>
					<TextField
						hintText='请输入您的密码'
						errorText={this.state.showErrorText && this.state.passwordErrorText }
						floatingLabelText='Password'
						type='password'
						value={this.state.password}
						id='password'
						onChange={this.handleTextFieldChange}
					/>
					{ loginToSignup }
				</Dialog>
			</div>
		)
	}
}

