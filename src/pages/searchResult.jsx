import React, { Component } from 'react';
import '../styles/css/main.css';
import Upperheader from '../components/index';
import ServiceCard from '../components/serviceCard';
import Footer from '../components/footer';

class SearchPage extends Component {
	render() {
		return (
		<div>
			<div id='data'>
				<Upperheader/>
			</div>
			<ServiceCard/>
			<Footer/>
		</div>
		);
	}
}

export default SearchPage;