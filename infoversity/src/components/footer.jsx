import React, { Component } from 'react';
import '../styles/css/main.css'
import '../styles/css/bootstrap.min.css';

class Upperheader extends Component {
	constructor(props) {
    super(props);
    this.state = {
		};
	}

	render() {
		return (
			<React.Fragment>
				<div className='container-fluid footer-background'>
					<div className='row'>
						<div className='col-lg-12 text-center'>
					 		<i className='fa fa-copyright'></i> 2020&nbsp;
							<span className='bold-white'>
								Info
							</span>
							<span className='color-white'>
								versity
							</span>
							 . All rights received. 
						</div>
					</div>
				</div>
			</React.Fragment>
		)
	} 
}

export default Upperheader;