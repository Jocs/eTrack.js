import React, { Component, PropTypes } from 'react'
import Dialog from 'material-ui/lib/dialog'
import RaisedButton from 'material-ui/lib/raised-button'
import TextField from 'material-ui/lib/text-field'

import './index.scss'

export default class Login extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { loginPanel } = this.props
		const actions = [
			<RaisedButton
				label='Login'
				secondary={true}
				keyboardFocused={true}
				style={{marginRight: 50}}
			/>, <RaisedButton
				label='Cancel'
				primary={true}
				keyboardFocused={true}
			/>
		]
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

		return (
			<div>
				<Dialog
					title="登陆 eTrack.JS"
					actions={actions}
					modal={false}
					open={loginPanel}
					titleStyle={tittleStyle}
					contentStyle={contentStyle}
					actionsContainerStyle={actionsContainerStyle}
				>
					<TextField
						hintText="请输入您的用户名"
						floatingLabelText="User name"
					/><br/>
					<TextField
						hintText="请输入您的密码"
						floatingLabelText="Password"
						type='password'
					/><br/>
				</Dialog>
			</div>
		)
	}
}

