import React, { Component } from 'react';
import '../styles/css/main.css'
import '../styles/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom'
import { connect } from 'unistore/react'
import { actions } from '../store'

class Upperheader extends Component {
	constructor(props) {
    super(props);
    this.state = {
			selected:true,
			scrolled:false,
			listEmail: [],
			email: ''
		};
		this.handleScroll=this.handleScroll.bind(this)
	}

	selectDiselect() {
		this.setState({
			selected:false
		})
	}
	handleScroll() {
		if (window.scrollY > 300) {
			this.setState({
				scrolled : true
			})
		}
	}
	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll, true);
	}

	handleEmail = (e) => {
		this.setState({
			email:e.target.value
		})
	}

	sendMail = () => {
		let data = this.state.listEmail
		data.push(this.state.email)
		this.setState({
			listEmail: data
		})
		this.props.postMail(this.state.email)
	}

	render() {
		if(this.state.scrolled) {
			let className = 'container-fluid position-popup slide-up-footer'
			if(this.state.selected===false) {
				className = 'container-fluid position-popup display-set'
			}
			return (
				<React.Fragment>
					<div className={className}>
						<div className='row'>
							<div className='col-lg-5 col-md-12 col-sm-12 popmail-box text-left text-white' style={{backgroundColor:'#006a71'}}>
								<div className='fs-24 font-weight-bold mb-12'>
									Get updates from some universities?
									<span className='fl-r mt-m-20 cursor' onClick={()=>this.selectDiselect()}>
									&times;
									</span>
								</div>
								<div className='mt-10'>
								We will send updated information from universities around you and universities in the world to get accurate information.
								</div>
								<div className='row mt-20 mb-20'>
									<div className='col-lg-9 col-md-12 col-sm-12'>
										<input onChange={(e)=>this.handleEmail(e)} className='w-100 text-email' type="text" placeholder='Email address'/>
									</div>
									<div className='col-lg-3 col-md-12 col-sm-12 mtop-5'>
										<span onClick={()=>this.sendMail()} className='box-email' style={{backgroundColor:'rgb(255, 128, 0)'}}>
											Count me In!
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</React.Fragment>
			)
		} else {
			return (
				<div></div>
			)
		}
	} 
}

export default connect("",actions)(withRouter(Upperheader));