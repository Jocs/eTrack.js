/**
 * create by Jocs 2016.05.06
 */

import React, { Component, PropTypes } from 'react'
// import echarts from 'echarts' 已经在html中引用，防止bundle过大

export default class Pie extends Component {
	constructor(props) {
		super(props)
	}

	static propTypes = {
		browsers: PropTypes.array.isRequired,
		width: PropTypes.number,
		height: PropTypes.number,
		theme: PropTypes.string
	}

	componentDidMount() {
		this.drawChart()
	}

	componentDidUpdate(nextProps) {
		this.drawChart()
	}

	componentWillUnmount() {
		this.chart.dispose()
	}

	drawChart() {
		const { browsers, theme } = this.props
		const sortedBrowsers = browsers
		.sort((a, b) => {
			switch (true) {
				case (a.value - b.value) > 0: return -1
				case (a.value - b.value) < 0: return 1
				default: return 0
			}
		})
		const others = {
			name: 'Others',
			value: sortedBrowsers.slice(10).reduce((acc, b) => acc + b.value, 0)
		}
		const browsersTops = sortedBrowsers.slice(0, 10).concat(others)

		const names = browsersTops.map(b => b.name)
		const node = this.refs.chart
		const options = {
			title: {
				text: '用户浏览器分布',
				subtext: '面积模式',
				x: 'center'
			},
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)'
			},
			legend: {
				x: 'center',
				y: 'bottom',
				data: names
			},
			toolbox: {
				show: true,
				feature: {
					mark: {show: true},
					dataView: {show: true, readOnly: false},
					magicType: {
						show: true,
						type: ['pie', 'funnel']
					},
					restore: {show: true},
					saveAsImage: {show: true}
				}
			},
			calculable: true,
			series: [
				{
					name: '浏览器－主版本号',
					type: 'pie',
					radius: [10, '55%'],
					center: ['50%', '50%'],
					roseType: 'radius',
					label: {
						normal: {
							show: true
						},
						emphasis: {
							show: true
						}
					},
					lableLine: {
						normal: {
							show: true
						},
						emphasis: {
							show: true
						}
					},
					data: browsersTops
				}
			]
		}
		this.chart = echarts.init(node, theme)
		this.chart.setOption(options)

	}

	render() {
		const { width, height } = this.props
		return (
			<div
				ref='chart'
				style={{
					width: width || '100%',
					height: height || '100%'
				}}
			></div>
		)
	}
}
