import React, { Component } from 'react';
import '../styles/css/main.css';
import Upperheader from '../components/index';
import Dropdown from '../components/dropdownCountry';
import Footer from '../components/footer';
import ServiceCard from '../components/serviceCard';

class ListUniversities extends Component {
	render() {
		return (
			<div>
				<Upperheader/>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-lg-3 col-md-12 col-sm-12 col-12'>
							<Dropdown/>
						</div>
						<div className='col-lg-9 col-md-12 col-sm-12 col-12'>
							<ServiceCard/>
						</div>
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default ListUniversities;