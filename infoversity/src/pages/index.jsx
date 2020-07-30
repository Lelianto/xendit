import React, { Component } from 'react';
import '../styles/css/main.css';
import Upperheader from '../components/index';
import Bottomheader from '../components/mainPhoto';
import ServiceCard from '../components/serviceCard';
import Footer from '../components/footer';
import PopupMail from '../components/popUpMail'

class Homepage extends Component {
	render() {
		return (
		<div>
			<Upperheader/>
			<Bottomheader/>
			<ServiceCard/>
			<PopupMail/>
			<Footer/>
		</div>
		);
	}
}

export default Homepage;