import React, { Component, PropTypes } from 'react'
import Avatar from 'material-ui/lib/avatar'
import AppBar from 'material-ui/lib/app-bar'
import Menu from 'material-ui/lib/menus/menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import AccontIcon from 'material-ui/lib/svg-icons/action/account-circle'
import RefreshIndicator from 'material-ui/lib/refresh-indicator'

import './index.scss'

const style = {
	marginRight: 32,
	marginBottom: 32,
	top: 64,
	right: 24,
	width: 100,
	float: 'left',
	position: 'absolute',
	zIndex: 0
}
const accountStyle = {
	height: 51,
	width: 35,
	fill: '#cccccc',
	marginRight: 35,
	cursor: 'pointer'
}

class NavBar extends Component {
	constructor(props) {
		super(props)
		this.handleLogin = this.handleLogin.bind(this)
	}
	static propTypes = {
		isAuthenticated: PropTypes.bool.isRequired,
		toggleLoginPanel: PropTypes.func.isRequired,
		loadStatus: PropTypes.string.isRequired
	}
	handleLogin(event) {
		event.preventDefault()
		this.props.toggleLoginPanel('login')
	}

	render() {
		const { isAuthenticated, loadStatus } = this.props
		const style = {
			loading: {
				boxShadow: 'none',
				backgroundColor: 'rgb(0, 188, 212)'
			}
		}
		return (
			<AppBar
				title='{ eTrack.Js }'
				iconElementLeft={
					<div className='loading'>
						<RefreshIndicator
							size={50}
							left={70}
							top={0}
							loadingColor={"#FF9800"}
							status={loadStatus}
							style={style.loading}
						/>
					</div>
				}
				iconElementRight={
					!isAuthenticated ? (
						<AccontIcon style={accountStyle} onClick={this.handleLogin}/>
					) : (<div className='et-navbar-accont'>
						<Avatar
							className='et-avatar'
							src="src/assets/images/user.jpg"
						/>
						<span>ransixi</span>
						<Menu style={style}>
							<MenuItem primaryText="Setting" />
							<MenuItem primaryText="Logout" />
						</Menu>
					</div>)
				}
			/>
		)
	}

}

export default NavBar


