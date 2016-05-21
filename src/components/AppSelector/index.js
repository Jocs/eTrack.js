/**
 * create by Jocs 2016.05.03
 */

import React, { Component, PropTypes } from 'react'
import Title from 'material-ui/svg-icons/av/web-asset'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

import './index.scss'

export default class AppSelector extends Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}
	static propTypes = {
		items: PropTypes.array.isRequired,
		current: PropTypes.object.isRequired,
		onChange: PropTypes.func.isRequired
	}
	handleChange(event, index, value) {
		const { onChange } = this.props
		onChange(value)
	}
	render() {
		const { items, current } = this.props
		const options = items.map((item, index) => {
			return <MenuItem key={index} value={item._id} primaryText={item.name} />
		})
		return (
			<div className='app-selector'>
				<Title style={{verticalAlign: 'sub'}} color='#666'/>
				<span className='label'>应用名称:</span>
				<div className='title-wrapper'>
					<DropDownMenu value={current._id} onChange={this.handleChange}>
						{options}
					</DropDownMenu>
				</div>
			</div>
		)
	}
}
