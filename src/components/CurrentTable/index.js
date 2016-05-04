/**
 * create by Jocs 2016.05.04
 */

import React, { Component, PropTypes } from 'react'
import Table from 'material-ui/lib/table/table'
import TableHeaderColumn from 'material-ui/lib/table/table-header-column'
import TableRow from 'material-ui/lib/table/table-row'
import TableHeader from 'material-ui/lib/table/table-header'
import TableRowColumn from 'material-ui/lib/table/table-row-column'
import TableBody from 'material-ui/lib/table/table-body'
import IconButton from 'material-ui/lib/icon-button'
import More from 'material-ui/lib/svg-icons/navigation/more-horiz'

import './index.scss'

export default class CurrentTable extends Component {
	constructor(props) {
		super(props)
	}

	static propTypes = {
		list: PropTypes.array.isRequired
	}

	render() {
		const { list } = this.props
		const ERROR_REG = /ajax/
		const rows = list.map((l, index) => {
			const browser = JSON.parse(l.userAgentInfo.browser).name
			return (
				<TableRow key={index}>
					<TableRowColumn>
						{
							ERROR_REG.test(l.errorType) ? <span className='ajax'>AJAX</span> : <span className='js'>JS</span>
						}
					</TableRowColumn>
					<TableRowColumn>{new Date(Number(l.time)).toString().split(' ')[4]}</TableRowColumn>
					<TableRowColumn>{l.user}</TableRowColumn>
					<TableRowColumn>{l.message}</TableRowColumn>
					<TableRowColumn>{l.environment.url}</TableRowColumn>
					<TableRowColumn>{browser}</TableRowColumn>
					<TableRowColumn>
						<IconButton
							tooltip='Detail'
						>
							<More/>
						</IconButton>
					</TableRowColumn>
				</TableRow>
			)
		})
		return (
			<div className='current-table'>
				<Table
					height={window.innerHeight - 250}
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
						{/* <TableRow>
							<TableRowColumn>1</TableRowColumn>
							<TableRowColumn>John Smith</TableRowColumn>
							<TableRowColumn>Employed</TableRowColumn>
							<TableRowColumn>1</TableRowColumn>
							<TableRowColumn>John Smith</TableRowColumn>
							<TableRowColumn>Employed</TableRowColumn>
							<TableRowColumn>
								<IconButton
									tooltip='Detail'
								>
									<More/>
								</IconButton>
							</TableRowColumn>
						</TableRow> */}
					</TableBody>
				</Table>
			</div>
		)
	}
}
