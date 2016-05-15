/**
 * create by Jocs 2016.05.15
 */
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'redux-router'
import LeftNav from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import One from 'material-ui/svg-icons/image/looks-one'
import Two from 'material-ui/svg-icons/image/looks-two'
import Three from 'material-ui/svg-icons/image/looks-3'


import style from './style'

import './index.scss'

class Document extends Component {
	constructor(props) {
		super(props)
		this.state = {
			leftNav: true
		}
	}

	static propTypes = {
		children: PropTypes.object.isRequired
	}

	render() {
		return (
			<div className='document'>
				<LeftNav open={this.state.leftNav}
					containerStyle={style.leftNav}
				>
					<Link to='/start'
						className='console-link'
						activeClassName='console-current'
					>
						<MenuItem
							innerDivStyle={style.inDiv}
							leftIcon={<One style={style.icon}/>}
						>
							Get Start
						</MenuItem>
					</Link>
					<Link to='/topApi'
						className='console-link'
						activeClassName='console-current'
					>
						<MenuItem
							innerDivStyle={style.inDiv}
							leftIcon={<Two style={style.icon}/>}
						>
							Top Level API
						</MenuItem>
					</Link>
					<Link to='/uiApi'
						className='console-link'
						activeClassName='console-current'
					>
						<MenuItem
							innerDivStyle={style.inDiv}
							leftIcon={<Three style={style.icon}/>}
						>
							User Interface
						</MenuItem>
					</Link>
				</LeftNav>
				{this.props.children}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = dispatch => {
	return {push, dispatch, ...bindActionCreators(Object.assign({}), dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Document)
