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
import * as snackbarActionCreator from '../../actions/snackbar'
import Pagination from '../Pagination'
import Table from '../CurrentTable'

import './index.scss'
import style from './style'

class Search extends Component {
	constructor(props) {
		super(props)
		this.toggleSearch = this.toggleSearch.bind(this)
		this.simpleSearch = this.simpleSearch.bind(this)
		this.complexSearch = this.complexSearch.bind(this)
		this.handChange = this.handChange.bind(this)
		this.handleKeyUp = this.handleKeyUp.bind(this)
		this.state = {
			dirty: false,
			pageSize: this.props.search.pageSize,
			complex: false,
			searchType: 'simple',
			message: '',
			include: '',
			user: '',
			errorType: 'all',
			browser: 'all',
			start: '',
			end: ''
		}
	}

	static propTypes = {
		search: PropTypes.object.isRequired,
		consoleLeftNav: PropTypes.bool.isRequired,
		searchError: PropTypes.func.isRequired,
		openSnackBar: PropTypes.func.isRequired,
		currentApp: PropTypes.object.isRequired
	}

	toggleSearch() {
		this.setState({
			complex: !this.state.complex
		})
	}

	handChange(event, type) {
		this.setState({[type]: event.target.value}, () => {
			// console.log(this.state)
		})

	}

	handleKeyUp(event) {
		const ENTER_KEYCODE = 13
		if (event.keyCode === ENTER_KEYCODE) this.simpleSearch(event, 1)
	}

	simpleSearch(event, pageNumber) {
		event.preventDefault()
		const { openSnackBar, searchError } = this.props

		if (this.state.message === '') return openSnackBar('搜索框不能为空', 'info', 4000)
		this.setState({dirty: true})
		this.setState({searchType: 'simple'}, () => {
			searchError('simple', {
				message: this.state.message,
				appId: this.props.currentApp._id,
				pageNumber,
				pageSize: this.props.search.pageSize
			})
		})


	}

	complexSearch(event, pageNumber) {
		event.preventDefault()
		const { openSnackBar, searchError } = this.props
		const { include, user, errorType, browser, start, end } = this.state
		if (this.state.start === '' || this.state.end === '') return openSnackBar('日期不能为空', 'info', 4000)
		this.setState({dirty: true})
		this.setState({searchType: 'complex'}, () => {
			searchError('complex', {
				appId: this.props.currentApp._id,
				pageNumber,
				pageSize: this.props.search.pageSize,
				include, user, errorType, browser, start, end
			})
		})
	}

	render() {
		const { consoleLeftNav } = this.props
		const { searchResult, pageNumber, total } = this.props.search
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
							<input type='text'
								onChange={event => this.handChange(event, 'message')}
								onKeyUp={this.handleKeyUp}
							/>
							<SearchIcon
								style={style.searchIcon}
								onClick={event => this.simpleSearch(event, 1)}
							/>
						</div>
						<span
							onClick={this.toggleSearch}
						>高级搜索
						</span>
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
										onChange={event => this.handChange(event, 'include')}
									/>
									<label>用户：</label>
									<TextField
										hintText='不填默认搜索所有用户！'
										onChange={event => this.handChange(event, 'user')}
									/>
								</div>
								<div className='form-group radio'>
									<label>错误类型：</label>
									<RadioButtonGroup
										style={style.radioButtonGroup}
										name='shipSpeed' defaultSelected='all'
										onChange={event => this.handChange(event, 'errorType')}
									>
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
										name='shipSpeed' defaultSelected='all'
										onChange={event => this.handChange(event, 'browser')}
									>
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
									<input type='date'
										onChange={event => this.handChange(event, 'start')}
									/>
									－
									<input type='date'
										onChange={event => this.handChange(event, 'end')}
									/>
								</div>
								<div className='form-group serch-button'>
									<RaisedButton
										secondary={true}
										label='开始搜索'
										onClick={event => this.complexSearch(event, 1)}
									/>
								</div>
							</div>
						</div> : null}
					</ReactCSSTransitionGroup>
				</div>
				<div>
					{
						this.state.dirty === false
						? <div className='no-result'><img className='search-img' src='./src/assets/images/search.png'/></div>
						: searchResult.length === 0
						? <div className='no-result'><img src='./src/assets/images/NoResult.jpg'/></div>
						: <div className='table'>
							<Table
								list={searchResult}
								type='long'
							/>
							<Pagination
								offset={Number(pageNumber)}
								total={Number(total)}
								fetchData={
									this.state.searchType === 'simple'
									? this.simpleSearch : this.complexSearch
								}
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
	return bindActionCreators(Object.assign({}, searchActionCreator, snackbarActionCreator), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
