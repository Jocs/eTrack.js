import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Avatar from 'material-ui/lib/avatar'
import AppBar from 'material-ui/lib/app-bar'
import Menu from 'material-ui/lib/menus/menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import AccontIcon from 'material-ui/lib/svg-icons/action/account-circle'
import RefreshIndicator from 'material-ui/lib/refresh-indicator'
import style from './style'

import './index.scss'

class NavBar extends Component {
	constructor(props) {
		super(props)
		this.handleLogin = this.handleLogin.bind(this)
		this.handleAvatarClick = this.handleAvatarClick.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
		this.handleTitleClick = this.handleTitleClick.bind(this)

		this.state = {
			showMenu: false
		}
	}
	static propTypes = {
		isAuthenticated: PropTypes.bool.isRequired,
		toggleLoginPanel: PropTypes.func.isRequired,
		loadStatus: PropTypes.string.isRequired,
		portrait: PropTypes.string,
		logout: PropTypes.func,
		userName: PropTypes.string,
		toggleConsleLeftNav: PropTypes.func.isRequired,
		push: PropTypes.func.isRequired,
		dispatch: PropTypes.func.isRequired,
		router: PropTypes.object.isRequired
	}
	handleLogin(event) {
		event.preventDefault()
		this.props.toggleLoginPanel('login')
	}

	handleLogout(event) {
		event.preventDefault()
		const { logout, push, dispatch } = this.props
		this.setState({showMenu: false})
		logout()
		dispatch(push('/'))
	}

	handleAvatarClick(event) {
		event.preventDefault()
		this.setState({
			showMenu: !this.state.showMenu
		})
	}

	handleTitleClick(event) {
		const { toggleConsleLeftNav, dispatch, push, router } = this.props
		event.preventDefault()
		console.log(router)
		if (!/dashboard/.test(router.location.pathname)) dispatch(push('/dashboard'))
		toggleConsleLeftNav()
	}

	render() {
		const { isAuthenticated, loadStatus, portrait, userName } = this.props
		const title = (<span
				className='et-nav-title'
				onClick={this.handleTitleClick}
			>&#123; eTrack.Js &#125;</span>)
		return (
			<AppBar
				title={ title }
				titleStyle={style.title}
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
						<span>{ userName }</span>
						{ this.state.showMenu ? (<Menu style={style.menu}>
							<MenuItem
								primaryText='个人设置'
							/>
							<Link to='/createApp'
								className='navbar-link'
							>
								<MenuItem
									primaryText='新建应用'
								/>
							</Link>
							<MenuItem
								primaryText="登出应用"
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


