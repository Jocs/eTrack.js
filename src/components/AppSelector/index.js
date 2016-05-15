/**
 * create by Jocs 2016.05.03
 */

import React, { Component, PropTypes } from 'react'
import Title from 'material-ui/svg-icons/av/web-asset'

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
	handleChange(event) {
		const { onChange } = this.props
		onChange(event.target.value)
	}
	render() {
		const { items, current } = this.props
		const options = items.map((item, index) => {
			return <option key={index} value={item._id}>{item.name}</option>
		})
		return (
			<div className='app-selector'>
				<Title style={{verticalAlign: 'sub'}} color='#666'/>
				<span className='label'>应用名称:</span>
				<div className='title-wrapper'>
					<span className='title'>{current.name}</span>
					<select value={current._id} onChange={this.handleChange}>
						{options}
					</select>
				</div>
			</div>
		)
	}
}