/**
 * crete by Jocs 2016.04.22
 */
import React, { Component } from 'react'
import Pie from '../Pie'

import './index.scss'

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			browsers: [
				{ 'name': 'Chrome-52', 'value': 7 },
				{ 'name': 'Safari-9', 'value': 6 },
				{ 'name': 'Firefox-47', 'value': 6 },
				{ 'name': 'Firefox-44', 'value': 5 },
				{ 'name': 'Opera-36', 'value': 7 },
				{ 'name': 'Opera-37', 'value': 5 },
				{ 'name': 'Chrome-50', 'value': 7 }
			]
		}
	}
	render() {
		return (
			<div className='home'>
				<section className='logo-page'>
					<h1>{'{eTrack.Js}'}</h1>
					<h3>帮您构建更好的JavaScript应用</h3>
					<div>
						<a href='https://github.com/Jocs/jocs.github.io/issues/1'>阅读文档</a>
						<a href='javascript:;'>立即使用</a>
					</div>
				</section>
				<section className='map-page'>
					<div className='map-wrapper'>
						<img src='./src/assets/images/map.jpg'/>
					</div>
					<div className='text right'>
						<p>用户错误实时推送</p>
						<p>每个错误跃然眼前</p>
					</div>
				</section>
				<section className='browser-page'>
					<div className='text left'>
						<p>了解用户浏览器偏好</p>
						<p>让开发、测试更容易</p>
					</div>
					<div className='pie'>
						<Pie
							width={400}
							height={400}
							browsers={this.state.browsers}
						/>
					</div>
				</section>
				<section className='detail-page'>
					<div className='detail-image'>
						<img src='./src/assets/images/detail.jpg'/>
					</div>
					<div className='text right'>
						<p>用户页面访问行为追踪</p>
						<p>后台请求信息尽收眼底</p>
					</div>
				</section>
				<footer className='foot'>
					<p className='rights'>All Rights Reserved © 2016</p>
					<h3>eTrack.Js</h3>
					<a href='https://github.com/Jocs' className='github'>GitHub</a>
				</footer>
			</div>
		)
	}
}

export default Home
