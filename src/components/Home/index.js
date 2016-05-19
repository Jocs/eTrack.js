/**
 * crete by Jocs 2016.04.22
 */
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActionCreator from '../../actions/auth'
import { push } from 'redux-router'
import { download } from '../../utils/fetchService'

import './index.scss'

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			about: 'eTrack.Js is a JavaScript Error monitor and reportor. $' +
					'Help you build a better JavaScript Application. $' +
					'Hope you love it and enjoy your development.',
			showWord: '',
			cursor: true
		}
	}

	static propTypes = {
		toggleLoginPanel: PropTypes.func.isRequired,
		push: PropTypes.func.isRequired,
		dispatch: PropTypes.func.isRequired
	}

	componentDidMount() {
		this.timerCursor = setInterval(() => {
			this.setState({cursor: !this.state.cursor})
		}, 500)
		this.timerWord = setInterval(() => {
			if (this.state.showWord.length < this.state.about.length) {
				this.setState({
					showWord: this.state.about.substr(0, this.state.showWord.length + 1)
				})
			} else {
				this.setState({
					showWord: ''
				})
			}
		}, 70)
	}

	componentWillUnmount() {
		clearInterval(this.timerCursor)
		clearInterval(this.timerWord)
	}

	render() {
		const { toggleLoginPanel } = this.props
		const { cursor, showWord } = this.state
		const { push, dispatch } = this.props
		return (
			<div className='home'>
				<section className='logo-page'>
					<h1>{'{eTrack.Js}'}</h1>
					<h3>
						/*&nbsp;
						{/\./.test(showWord) ? showWord.split(/\$/)[showWord.split(/\$/).length - 1] : showWord}
						<span style={{color: cursor ? '#eee' : 'rgb(0, 188, 212)'}}>&nbsp;|</span>
						&nbsp;*/
					</h3>
					<div>
						<a href='javascript:;'
							onClick={event => dispatch(push('/start'))}
						>Document</a>
						<a href='javascript:;'
							onClick={event => toggleLoginPanel('login')}
						>Use Now</a>
					</div>
				</section>
				<section className='map-page'>
					<div className='section-container'>
						<div className='map-wrapper'>
							<img src='./src/assets/images/map.jpg'/>
						</div>
						<div className='text'>
							<p>用户错误实时推送</p>
							<p>每个错误跃然眼前</p>
						</div>
					</div>
				</section>
				<section className='browser-page'>
					<div className='section-container'>
						<div className='text'>
							<p>了解用户浏览器偏好</p>
							<p>让开发、测试更容易</p>
						</div>
						<div className='pie'>
							<img src='./src/assets/images/browser.jpg'/>
						</div>
					</div>

				</section>
				<section className='detail-page'>
					<div className='section-container'>
						<div className='detail-image'>
							<img src='./src/assets/images/detail.png'/>
						</div>
						<div className='text'>
							<p>用户页面访问行为追踪</p>
							<p>后台请求信息尽收眼底</p>
						</div>
					</div>

				</section>
				<footer className='foot'>
					<p className='rights'>All Rights Reserved © 2016</p>
					<h3>{'{eTrack.Js}'}</h3>
					<a href='/download' className='download'
					>Download .</a>
					<a href='javascript:;' className='doc'
						onClick={event => dispatch(push('/start'))}
					>Document .</a>
					<a href='https://github.com/Jocs/jocs.github.io/issues/1' className='blog'>Blog .</a>
					<a href='https://github.com/Jocs/eTrack.Js' className='github'>GitHub</a>
				</footer>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = dispatch => {
	return {push, dispatch, ...bindActionCreators(Object.assign({}, authActionCreator), dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

