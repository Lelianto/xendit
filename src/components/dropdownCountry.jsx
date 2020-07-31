import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store';
import '../styles/css/main.css'
import '../styles/css/bootstrap.min.css';

class Dropdown extends Component {
	constructor(props) {
    super(props);
    this.state = {
			click: false,
		};
	}
	searchHandle = (e) => {
		this.setState({
			click: false
		})
		this.props.getRecommendation(e.target.value)
	}
	handleFilter = (e) => {
		this.props.getUniversity(e, 'country')
		this.setState({
			click: true
		})
	}
	render() {
		let data = this.props.countries
		return (
			<React.Fragment>
				<div className='container-fluid dropdown-upper'>
					<div className='row'>
						<div class="md-form">
							<input class="form-control" type="text" onChange={(e)=>this.searchHandle(e)} placeholder="Search by Country" aria-label="Search"/>
						</div>
					</div>
					{
						data.length !== 0 && this.state.click===false ?
							<div className='row'>
								<div className='col-lg-12 box-rec'>
									{
										data.map((item)=>(
											<div onClick={()=>this.handleFilter(item)} className='row recommendation'>
												{item}
											</div>
										))
									}
								</div>
							</div>
						:
							<div className='row undisplay-recommencation'>
								<div className='col-lg-12 recommendation'>
									Hasil Pencarian
								</div>
							</div>
					}
				</div>
			</React.Fragment>
		)
	} 
}

export default connect("countries",actions)(withRouter(Dropdown));