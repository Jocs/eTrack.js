/**
 * create by Jocs 2016.05.04
 */

import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import {
	Table,
	TableRow,
	TableHeader,
	TableHeaderColumn,
	TableRowColumn,
	TableBody
} from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import More from 'material-ui/svg-icons/navigation/more-horiz'

import './index.scss'

export default class CurrentTable extends Component {
	constructor(props) {
		super(props)
	}

	static propTypes = {
		list: PropTypes.array.isRequired,
		type: PropTypes.string
	}

	render() {
		const { list, type } = this.props
		const ERROR_REG = /ajax/
		const rows = list.map((l, index) => {
			const browser = l.userAgentInfo ? JSON.parse(l.userAgentInfo.browser).name : '未知浏览器'
			return (
				<TableRow key={index} className='row-column'>
					<TableRowColumn>
						{
							ERROR_REG.test(l.errorType) ? <span className='ajax'>AJAX</span> : <span className='js'>JS</span>
						}
					</TableRowColumn>
					<TableRowColumn>{getTime(l.time, type)}</TableRowColumn>
					<TableRowColumn>{l.user}</TableRowColumn>
					<TableRowColumn>{l.message}</TableRowColumn>
					<TableRowColumn>{l.environment.url}</TableRowColumn>
					<TableRowColumn>{browser}</TableRowColumn>
					<TableRowColumn>
						<Link
							to={`/detail/${l._id}`}
						>
						<IconButton
							tooltip='Detail'
						>
							<More/>
						</IconButton>
						</Link>
					</TableRowColumn>
				</TableRow>
			)
		})
		return (
			<div className='current-table'>
				<Table
					height={type === 'short' ? (window.innerHeight - 250).toString() + 'px' : 'auto'}
					fixedHeader={true}
					selectable={false}
				>
					<TableHeader>
						<TableRow>
							<TableHeaderColumn>类型</TableHeaderColumn>
							<TableHeaderColumn>时间</TableHeaderColumn>
							<TableHeaderColumn>用户</TableHeaderColumn>
							<TableHeaderColumn>错误信息</TableHeaderColumn>
							<TableHeaderColumn>URL</TableHeaderColumn>
							<TableHeaderColumn>浏览器</TableHeaderColumn>
							<TableHeaderColumn>详情</TableHeaderColumn>
						</TableRow>
						</TableHeader>
					<TableBody>
						{rows}
					</TableBody>
				</Table>
			</div>
		)
	}
}

function getTime(time, type) {
	const date = new Date(Number(time))
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const shortTime = date.toString().split(' ')[4]
	const longTime = `${year}/${month}/${day} ${shortTime}`
	switch (type) {
		case 'short': return shortTime
		case 'long': return longTime
		default: return shortTime
	}
}
