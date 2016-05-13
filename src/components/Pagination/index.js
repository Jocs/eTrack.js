/**
 * create by Jocs 2016.05.12
 */

import React, { Component, PropTypes } from 'react'
import Left from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-left'
import Right from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-right'

import './index.scss'

/**
 * 用于获取展示的页码
 */
const getPageNumbers = (offset, total) => {
	const isFrontDots = (offset - 1) > 4 && total > 9
	const isEndDots = (total - offset) > 4 && total > 9
	const fullPageArray = []
	for (let i = 1; i <= total; i++) {
		fullPageArray.push({
			value: i,
			isCurrent: i === offset,
			isDot: false
		})
	}

	if (isFrontDots) {
		fullPageArray.splice(1, Math.min(total - 8, offset - 4), {
			value: '...',
			isCurrent: false,
			isDot: true
		})
	}

	if (isEndDots) {
		fullPageArray.splice(7, Math.min(total - 8, total - offset - 3), {
			value: '...',
			isCurrent: false,
			isDot: true
		})
	}
	return fullPageArray
}

const validValue = (value, offset, total) => {
	const v = parseInt(value, 10)
	if (!~Object.prototype.toString.call(v).indexOf('Number') || Number.isNaN(v)) return offset
	switch (true) {
		case v >= 1 && v <= total: return v
		case v < 1: return 1
		case v > total: return total
	}
}

let lastValue = ''

class Pagination extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
		this.handleKeyUp = this.handleKeyUp.bind(this)
		this.state = {
			offset: this.props.offset,
			total: this.props.total
		}
	}

	static propTypes = {
		offset: PropTypes.number.isRequired,
		total: PropTypes.number.isRequired,
		fetchData: PropTypes.func.isRequired
	}

	componentDidMount() {
		this.refs.input.value = this.state.offset
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.offset !== this.props.offset || nextProps.total !== this.props.total) {
			this.setState({
				offset: nextProps.offset,
				total: nextProps.total
			}, () => {
				this.refs.input.value = this.state.offset
			})
		}
	}

	handleKeyUp(event) {
		const { fetchData } = this.props
		const { offset, total } = this.state
		const target = event.target
		const value = target.value
		const ENTER_KEYCODE = 13
		if (value === '') return false;
		/^[\d]+$/.test(value) ? lastValue = value : this.refs.input.value = lastValue
		if (event.keyCode === ENTER_KEYCODE) {
			const v = Number(validValue(value, offset, total))
			if (v !== Number(this.state.offset)) {
				fetchData(event, v)
			}
			this.setState({
				offset: v
			}, () => {
				this.refs.input.value = v
			})
		}
	}

	handleClick(event, where) {
		event.preventDefault()
		const { fetchData } = this.props
		const { offset } = this.state
		switch (typeof where) {
			case 'number': {
				if (where !== offset) {
					this.setState({offset: where}, () => {
						fetchData(event, this.state.offset)
						this.refs.input.value = this.state.offset
					})
				}
				break
			}
			case 'string': {
				if (where === 'next') {
					if (Number(this.state.offset) < Number(this.state.total)) {
						console.log('ddd')
						this.setState({offset: this.state.offset + 1}, () => {
							fetchData(event, this.state.offset)
							this.refs.input.value = this.state.offset
						})
					}
				}
				if (where === 'previous') {
					if (this.state.offset > 1) {
						this.setState({offset: this.state.offset - 1}, () => {
							fetchData(event, this.state.offset)
							this.refs.input.value = this.state.offset
						})
					}
				}
				break
			}
			default: break
		}
	}

	render() {
		const { offset, total } = this.state
		const pageNumbers = getPageNumbers(offset, total)
		const numbersChildren = pageNumbers.map((p, index) => {
			const className = p.isCurrent ? 'current-page' : p.isDot ? 'dot' : ''
			return (
				<li key={index}>
					<a
						href='javascript:;'
						className={className}
						onClick={event => this.handleClick(event, p.value)}
					>{p.value}</a>
				</li>
			)
		})
		return (
			<div className='pagination page-center'>
				<a
					href='javascript:;'
					className='arrow'
					style={{cursor: this.state.offset === 1 ? 'not-allowed' : 'pointer'}}
					onClick={event => this.handleClick(event, 'previous')}
				>
					<Left/>
				</a>
				<ul>
					{numbersChildren}
				</ul>
				<a
					href='javascript:;'
					className='arrow'
					style={{cursor: this.state.offset === this.state.total ? 'not-allowed' : 'pointer'}}
					onClick={event => this.handleClick(event, 'next')}
				>
					<Right/>
				</a>
				<span>第</span>
				<input
					type='del'
					ref='input'
					onKeyUp={this.handleKeyUp}
				/>
				<span>页</span>
			</div>
		)
	}
}

export default Pagination
