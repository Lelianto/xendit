import React, { Component } from 'react';
import '../styles/css/main.css'
import '../styles/css/bootstrap.min.css';
import backgroundPhoto from '../assets/images/university.jpg';

class Bottomheader extends Component {
	render() {
		return (
			<React.Fragment>
				<div className='container-fluid'>
					<div className='row main-frame'>
					</div>
					<div className='row main-word'>
					<div className='col-lg-12 fs-32 mb-12 zindex-100'>
							We Help You To Find The
						</div>
						<div className='col-lg-12 content zindex-100'>
							<span className='fs-32 slider-wrapper'>
								<div className='slider'>
									<div className='slider-text1'>Information</div>
									<div className='slider-text2'>Location</div>
									<div className='slider-text3'>Website</div>
								</div>
							</span>
						</div>
						<div className='col-lg-12 fs-32 mb-20 zindex-100'>
							Of The Best University
						</div>
						<div className='col-lg-12 zindex-100'>
							<span className='button-contact-us'>
								See Some University
							</span>
						</div>
					</div>
					<div className='row'>
						<div className='col-lg-12 pad-zero height-setting'>
							<img className='backgound-settings' src={backgroundPhoto} alt=""/>
						</div>
					</div>
				</div>
			</React.Fragment>
		)
	} 
}

export default Bottomheader;