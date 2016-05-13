/**
 * create by Jocs 2016.05.06
 */

import React, { Component, PropTypes } from 'react'
// import echarts from 'echarts'

export default class Map extends Component {
	constructor(props) {
		super(props)
	}

	static propTypes = {
		height: PropTypes.number.isRequired,
		width: PropTypes.number.isRequired,
		errors: PropTypes.array.isRequired,
		push: PropTypes.func.isRequired,
		dispatch: PropTypes.func.isRequired,
		fetchDetail: PropTypes.func.isRequired,
		theme: PropTypes.string
	}

	componentDidMount() {
		this.drawChart()
	}

	componentDidUpdate() {
		this.chart.off('click')
		this.drawChart()
	}


	componentWillUnmount() {
		this.chart.off('click')
		this.chart.dispose()
	}

	drawChart() {
		const node = this.refs.chart
		const { errors, theme } = this.props
		const data = errors.reduce((acc, e, i) => {
			const { latitude, longitude } = JSON.parse(e.environment.location)
			const value = {
				name: e.user,
				value: [longitude, latitude, e.message, e._id, e.time]
			}
			return {
				top10: i < 10 ? [...acc.top10, value] : acc.top10,
				js: i >= 10 && e.errorType !== 'ajax@error' ? [...acc.js, value] : acc.js,
				ajax: i >= 10 && e.errorType === 'ajax@error' ? [...acc.ajax, value] : acc.ajax
			}
		}, {
			top10: [],
			js: [],
			ajax: []
		})

		const options = {
			title: {
				text: '用户错误地理位置分布',
				subtext: '根据经纬度'
			},
			tooltip: {
				trigger: 'item',
				formatter: params =>
				`${params.name}:  ${new Date(Number(params.value[4])).toString().split(' ')[4]} <br/> ${params.value[2].substr(0, 40)}`
			},
			legend: {
				orient: 'vertical',
				y: 'bottom',
				x: 'right',
				data: ['JavaScript', 'Ajax', 'Latest10']
			},
			toolbox: {
				show: true,
				feature: {
					dataView: {readOnly: false},
					restore: {},
					saveAsImage: {}
				}
			},
			geo: {
				map: 'china',
				label: {
					emphasis: {
						show: false
					}
				},
				roam: true,
				itemStyle: {
					normal: {
						areaColor: '#323c48',
						borderColor: '#111'
					},
					emphasis: {
						areaColor: '#2a333d'
					}
				}
			},
			series: [
				{
					name: 'JavaScript',
					type: 'scatter',
					coordinateSystem: 'geo',
					data: data.js,
					symbolSize: 10,
					label: {
						normal: {show: false},
						emphasis: {show: false}
					},
					itemStyle: {
						normal: {
							color: '#ddb926'
						},
						emphasis: {
							borderColor: '#fff',
							borderWidth: 1
						}
					}
				},
				{
					name: 'Ajax',
					type: 'scatter',
					coordinateSystem: 'geo',
					data: data.ajax,
					symbolSize: 10,
					label: {
						normal: {show: false},
						emphasis: {show: false}
					},
					itemStyle: {
						normal: {
							color: 'rgb(39, 114, 123)'
						},
						emphasis: {
							borderColor: '#fff',
							borderWidth: 1
						}
					}
				},
				{
					name: 'Latest10',
					type: 'effectScatter',
					coordinateSystem: 'geo',
					data: data.top10,
					symbolSize: 12,
					showEffectOn: 'render',
					rippleEffect: {
						brushType: 'stroke'
					},
					hoverAnimation: true,
					label: {
						normal: {show: false},
						emphasis: {show: false}
					},
					itemStyle: {
						normal: {
							color: 'rgb(193, 35, 43)',
							shadowBlur: 10,
							shadowColor: '#333'
						}
					}
				}
			]
		}

		this.chart = echarts.init(node, theme)
		this.chart.setOption(options)

		const { push, dispatch, fetchDetail } = this.props

		this.chart.on('click', params => {
			fetchDetail(params.value[3])
			dispatch(push(`detail/${params.value[3]}`))
		})
	}


	render() {
		const { height, width } = this.props
		return (
			<div
				ref='chart'
				style={{
					height: height || '100%',
					width: width || '100%'
				}}
			></div>
		)
	}
}
