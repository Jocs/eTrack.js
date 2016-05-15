/**
 * create by Jocs 2016.05.15
 */
import React, { Component } from 'react'
import {
	Step,
	Stepper,
	StepLabel
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import './index.scss'

class Start extends Component {
	constructor(props) {
		super(props)
		this.handleNext = this.handleNext.bind(this)
		this.handlePrev = this.handlePrev.bind(this)
		this.state = {
			stepIndex: 0,
			finished: false
		}
	}

	handleNext = () => {
		const {stepIndex} = this.state
		this.setState({
			stepIndex: stepIndex + 1,
			finished: stepIndex >= 2
		})
	}
	handlePrev = () => {
		const {stepIndex} = this.state
		if (stepIndex > 0) {
			this.setState({stepIndex: stepIndex - 1})
		}
	}

	getStepContent(stepIndex) {
		switch (stepIndex) {
			case 0:
				return (
					<div className='step'>
						<div className='img-wrapper'>
							<img src='./src/assets/images/create.png'/>
						</div>
						<div className='intro'>
							<p>1. 选择应用列表菜单，点击创建应用。</p>
							<p>2. 填写应用名称，和您需要监测网站的URL。当错误信息发送到eTrack.Js服务器后
								会和URL做一个比对，比对成功后才会将存储并报告错误信息，因此请务必正确填写URL。
							</p>
							<p>3. 点击确定，您的应用创建成功，生成的ID将是您应用的唯一标识。</p>
							<p>4. 每个用户最多能够创建5个应用。</p>
						</div>
					</div>
				)
			case 1:
				return (
					<div className='step'>
						<div className='img-wrapper'>
							<img src='./src/assets/images/embed.png'/>
						</div>
						<div className='intro'>
							<p>1. 进入首页，在页面底部，点击下载最新etrack.min.js文件。</p>
							<p>2. 如右图，进入您项目中的index.html文件中。把刚才创建好的
								应用ID以图中的格式添加到head标签内。
							</p>
							<p>3. 把下载好的etrack.min.js文件如图中格式添加到应用ID配置下面。
								保证该文件是您项目中应用的第一个文件。项目启动前几秒是错误高发时段。这样保证了eTrack.Js在您项目启动后就能够
								马上收集错误。
							</p>
						</div>
					</div>
				)
			case 2:
				return (
					<div className='step'>
						<div className='img-wrapper'>
							<img src='./src/assets/images/createError.png'/>
						</div>
						<div className='intro'>
							<p>1. 启动您的项目，进入浏览器控制台。</p>
							<p>2. 通过console.error()手动打印一条错误信息。</p>
							<p>3. 进入eTrack.Js控制页面，如果实时错误中提示有一条新的错误。
							进入实时错误，点击刷新按钮，您的错误将显示在页面中，点击详情查看错误详细记录。
							</p>
						</div>
					</div>
				)
			default:
				return 'You\'re a long way from home sonny jim!'
		}
	}

	render() {
		const {stepIndex, finished} = this.state
		return (
			<div className='start'>
				<Stepper linear={false} activeStep={stepIndex}
					style={{maxWidth: '900px'}}
				>
					<Step>
						<StepLabel>
						创建第一个应用
						</StepLabel>
					</Step>
					<Step>
						<StepLabel>
						添加统计js文件
						</StepLabel>
					</Step>
					<Step>
						<StepLabel>
						手动生成一条错误
						</StepLabel>
					</Step>
				</Stepper>
				{finished ? (
					<p className='finish'>
						<RaisedButton
							primary={true}
							label='重新开始'
							onClick={event => {
								event.preventDefault()
								this.setState({stepIndex: 0, finished: false})
							}}
						/>
						<div className='text'>恭喜您创建并使用第一个eTrack.Js应用，希望eTrack.Js能够帮助您更好得开发和测试。</div>
					</p>
					) : (
					<div className='steps'>
						<p>{this.getStepContent(stepIndex)}</p>
						<div style={{marginTop: 12}}>
							<FlatButton
								label="Back"
								disabled={stepIndex === 0}
								onClick={this.handlePrev}
								style={{marginRight: 12}}
							/>
							<RaisedButton
								label={stepIndex === 2 ? 'Finish' : 'Next'}
								primary={true}
								onClick={this.handleNext}
							/>
						</div>
					</div>
				)}
			</div>
		)
	}
}

export default Start
