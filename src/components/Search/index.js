/**
 * create by Jocs 2016.05.09
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SearchIcon from 'material-ui/lib/svg-icons/action/search'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import TextField from 'material-ui/lib/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/lib'
import RaisedButton from 'material-ui/lib/raised-button'
import Toggle from 'material-ui/lib/svg-icons/action/code'

import * as searchActionCreator from '../../actions/search'
import Pagination from '../Pagination'
import Table from '../CurrentTable'

import './index.scss'
import style from './style'

class Search extends Component {
	constructor(props) {
		super(props)
		this.toggleSearch = this.toggleSearch.bind(this)
		this.state = {
			pageSize: this.props.search.pageSize,
			complex: false
		}
	}

	static propTypes = {
		search: PropTypes.object.isRequired,
		consoleLeftNav: PropTypes.bool.isRequired,
		searchError: PropTypes.func.isRequired
	}

	toggleSearch() {
		this.setState({
			complex: !this.state.complex
		})
	}

	render() {
		const { consoleLeftNav, searchError } = this.props
		const { searchResult } = this.props.search
		const searchStyle = consoleLeftNav ? {marginLeft: 170} : {marginLeft: 0}

		return (
			<div className='search'
				style={searchStyle}
			>
				<div
					className='search-panel'
				>
					<div className='simple-serch'>
						<div className='search-wrapper'>
							<input type='text'/>
							<SearchIcon
								style={style.searchIcon}
							/>
						</div>
						<span
							onClick={this.toggleSearch}
						>高级搜索</span>
					</div>
					<ReactCSSTransitionGroup
						transitionName='searchPanel'
						transitionEnterTimeout={300}
						transitionLeaveTimeout={300}
					>
						{this.state.complex
							? <div className='complex-search'>
							<Toggle
								style={style.toggle}
								onClick={this.toggleSearch}
							/>
							<div className='complex-inner'>
								<div className='form-group'>
									<label>错误信息：</label>
									<TextField
										hintText='不填默认搜索全部错误！'
									/>
									<label>用户：</label>
									<TextField
										hintText='不填默认搜索所有用户！'
									/>
								</div>
								<div className='form-group radio'>
									<label>错误类型：</label>
									<RadioButtonGroup
										style={style.radioButtonGroup}
										name='shipSpeed' defaultSelected='all'>
										<RadioButton
											value='js'
											label='JavaScript'
											style={style.radioButton}
										/>
										<RadioButton
											value='ajax'
											label='AJAX'
											style={style.radioButton}
										/>
										<RadioButton
											value='all'
											label='ALL'
											style={style.radioButton}
										/>
									</RadioButtonGroup>
								</div>
								<div className='form-group radio'>
									<label>浏览器：</label>
									<RadioButtonGroup
										style={style.radioButtonGroup}
										name='shipSpeed' defaultSelected='all'>
										<RadioButton
											value='chrome'
											label='Chrome'
											style={style.radioButton}
										/>
										<RadioButton
											value='firefox'
											label='FireFox'
											style={style.radioButton}
										/>
										<RadioButton
											value='opera'
											label='Opera'
											style={style.radioButton}
										/>
										<RadioButton
											value='safari'
											label='Safari'
											style={style.radioButton}
										/>
										<RadioButton
											value='all'
											label='All'
											style={style.radioButton}
										/>
									</RadioButtonGroup>
								</div>
								<div className='form-group date-picker'>
									<label>时间范围：</label>
									<input type='date'/>
									－
									<input type='date'/>
								</div>
								<div className='form-group serch-button'>
									<RaisedButton
										secondary={true}
										label='开始搜索'
									/>
								</div>
							</div>
						</div> : null}
					</ReactCSSTransitionGroup>
				</div>
				<div>
					{
						searchResult.length === 0
						? <div>暂无结果</div>
						: <div className='table'>
							<Table
								list={searchResult}
								type='long'
							/>
							<Pagination
								offset={12}
								total={23}
								fetchData={data => console.log(data)}
							/>
						</div>
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { currentApp } = state.current
	const { consoleLeftNav } = state.console
	const { search } = state
	return { currentApp, search, consoleLeftNav }
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators(Object.assign({}, searchActionCreator), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
