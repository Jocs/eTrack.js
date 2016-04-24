/**
 * create by Jocs 2016.04.24
 */
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import DashIcon from 'material-ui/lib/svg-icons/action/dashboard'
import ListIcon from 'material-ui/lib/svg-icons/device/dvr'
import AppIcon from 'material-ui/lib/svg-icons/content/font-download'
import * as consoleActionsCreator from '../../actions/console'
import style from './style'

import './index.scss'

class Console extends Component {
	constructor(props) {
		super(props)
	}

	static propTypes = {
		children: PropTypes.object.isRequired,
		consoleLeftNav: PropTypes.bool.isRequired
	}

	render() {
		const { consoleLeftNav } = this.props
		return (
			<div className='console'>
				<LeftNav open={consoleLeftNav}
					style={style.leftNav}
				>
					<Link to='/dashboard'
						className='console-link'
						activeClassName='console-current'
					>
						<MenuItem
							innerDivStyle={style.inDiv}
							leftIcon={<DashIcon style={style.icon}/>}
						>
							统计图表
						</MenuItem>
					</Link>
					<Link to='/current'
						className='console-link'
						activeClassName='console-current'
					>
						<MenuItem
							innerDivStyle={style.inDiv}
							leftIcon={<ListIcon style={style.icon}/>}
						>
							实时错误
						</MenuItem>
					</Link>
					<Link to='/applist'
						className='console-link'
						activeClassName='console-current'
					>
						<MenuItem
							innerDivStyle={style.inDiv}
							leftIcon={<AppIcon style={style.icon}/>}
						>
							应用列表
						</MenuItem>
					</Link>
				</LeftNav>
				{this.props.children}
			</div>
		)
	}
}

const mapStateToProps = state => {
	const {
		consoleLeftNav
	} = state.console
	return { consoleLeftNav }
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators(Object.assign({}, consoleActionsCreator), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Console)
