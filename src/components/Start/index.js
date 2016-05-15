/**
 * create by Jocs 2016.05.15
 */
import React, { Component, PropTypes } from 'react'
import {
	Step,
	Stepper,
	StepButton
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import './index.scss'

class Start extends Component {
	constructor(props) {
		super(props)
		this.state = {
			stepIndex: 0
		}
	}
	render() {
		const {stepIndex} = this.state
		return (
			<div className='start'>
				<Stepper linear={false} activeStep={stepIndex}>
		          <Step>
		            <StepButton onClick={() => this.setState({stepIndex: 0})}>
		              Select campaign settings
		            </StepButton>
		          </Step>
		          <Step>
		            <StepButton onClick={() => this.setState({stepIndex: 1})}>
		              Create an ad group
		            </StepButton>
		          </Step>
		          <Step>
		            <StepButton onClick={() => this.setState({stepIndex: 2})}>
		              Create an ad
		            </StepButton>
		          </Step>
		        </Stepper>
			</div>
		)
	}
}

export default Start
