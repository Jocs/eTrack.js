/**
 * create by Jocs 2016.05.09
 */

import React, { Component, PropTypes } from 'react'
import Pagination from '../Pagination'

import './index.scss'

class Search extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className='search'>
				This is Search page
				<Pagination
					offset={12}
					total={23}
					fetchData={data => console.log(data)}
				/>
			</div>
		)
	}
}

export default Search
