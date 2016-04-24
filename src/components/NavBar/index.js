import React, { Component, PropTypes } from 'react'
import Avatar from 'material-ui/lib/avatar'
import AppBar from 'material-ui/lib/app-bar'
import Menu from 'material-ui/lib/menus/menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import AccontIcon from 'material-ui/lib/svg-icons/action/account-circle'
import RefreshIndicator from 'material-ui/lib/refresh-indicator'

import './index.scss'

class NavBar extends Component {
	constructor(props) {
		super(props)
		this.handleLogin = this.handleLogin.bind(this)
		this.handleAvatarClick = this.handleAvatarClick.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
		this.state = {
			showMenu: false
		}
	}
	static propTypes = {
		isAuthenticated: PropTypes.bool.isRequired,
		toggleLoginPanel: PropTypes.func.isRequired,
		loadStatus: PropTypes.string.isRequired,
		portrait: PropTypes.string,
		logout: PropTypes.func
	}
	handleLogin(event) {
		event.preventDefault()
		this.props.toggleLoginPanel('login')
	}

	handleLogout(event) {
		event.preventDefault()
		const { logout } = this.props
		this.setState({showMenu: false})
		logout()
	}

	handleAvatarClick(event) {
		event.preventDefault()
		this.setState({
			showMenu: !this.state.showMenu
		})
	}

	render() {
		const { isAuthenticated, loadStatus, portrait, userName} = this.props
		const style = {
			loading: {
				boxShadow: 'none',
				backgroundColor: 'rgb(0, 188, 212)'
			},
			menu: {
				marginRight: 32,
				marginBottom: 32,
				top: 64,
				right: 24,
				width: 100,
				float: 'left',
				position: 'absolute',
				zIndex: 0
			},
			account: {
				height: 51,
				width: 35,
				fill: '#cccccc',
				marginRight: 35,
				cursor: 'pointer'
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
						<AccontIcon style={style.account} onClick={this.handleLogin}/>
					) : (<div className='et-navbar-accont'>
						<Avatar
							className='et-avatar'
							src={portrait}
							onClick={this.handleAvatarClick}
						/>
						<span>{userName}</span>
						{ this.state.showMenu ? (<Menu style={style.menu}>
							<MenuItem
								primaryText="Setting" />
							<MenuItem
								primaryText="Logout"
								onClick={this.handleLogout}
							/>
						</Menu>) : null}
					</div>)
				}
			/>
		)
	}

}

export default NavBar


