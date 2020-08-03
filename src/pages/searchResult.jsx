import React, { Component } from 'react';
import '../styles/css/main.css';
import Upperheader from '../components//header/index';
import ServiceCard from '../components//card/serviceCard';
import Footer from '../components/footer/footer';

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