import React, { Component } from 'react';
import '../styles/css/main.css';
import Upperheader from '../components/header/index';
import Bottomheader from '../components/slider/mainPhoto';
import ServiceCard from '../components/card/serviceCard';
import Footer from '../components/footer/footer';
import PopupMail from '../components/newsletter/popUpMail'

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