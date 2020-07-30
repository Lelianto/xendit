import React, { Component } from 'react';
import '../styles/css/main.css'
import '../styles/css/bootstrap.min.css';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'

class Upperheader extends Component {
	constructor(props) {
    super(props);
    this.state = {
			clicked: false
		};
	}
	searchHandle = (e) => {
		this.props.getUniversity(e.target.value)
		this.props.history.push('/')
	}
	checkParams = () => {
		if (!this.props.match.params.id) {
			if(localStorage.getItem('userAuth')) {
				this.props.history.push(`/${localStorage.getItem('userAuth')}`)
			}
		}
	}
	handleLogout() {
		this.props.Logout()
		this.props.history.push('/')
	}
	componentDidMount() {
		this.checkParams()
	}
	render() {
		return (
			<React.Fragment>
				<div className="container-fluid head-upper">
					<div className='row'>
						<div className='col-lg-12 pad-zero'>
							<nav class="navbar navbar-expand-lg navbar-light bg-blue row">
								<div className='col-lg-3 col-md-9 col-sm-9 col-9 text-left'>
									<Link className="navbar-brand brand-name" to="/">
										<span className='bold-white font-size-24'>
											Info
										</span>
										<span className='color-white font-light font-size-24'>
											versity
										</span>
									</Link>
								</div>
								<div className='col-lg-1 col-md-3 col-sm-3 col-3'>
									<button class="navbar-toggler distance" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
										<span class="navbar-toggler-icon"></span>
									</button>
								</div>
								<div className='col-lg-8 shadow-head'>
									<div class="collapse navbar-collapse" id="navbarSupportedContent">
											<div class="md-form">
												<input class="form-control" type="text" onChange={(e)=>this.searchHandle(e)} placeholder="Search by City" aria-label="Search"/>
											</div>
										<ul class="navbar-nav mr-auto nav-style">
											<li class="nav-item active distance">
												<Link class="nav-link" to="/">List University <span class="sr-only">Projects</span></Link>
											</li>
											{
												this.props.match.params.id?
												<li class="nav-item distance">
													<Link onClick={()=>this.handleLogout()} to='/' class="nav-link">Logout</Link>
												</li>
												:
												<React.Fragment>
													<li class="nav-item distance">
														<Link class="nav-link" to="/register">Register</Link>
													</li>
													<li class="nav-item distance">
														<Link class="nav-link" to="/login">Login</Link>
													</li>
												</React.Fragment>
											}
										</ul>
									</div>
								</div>
							</nav>
						</div>
					</div>
				</div>
			</React.Fragment>
		)
	} 
}

export default connect("infoData",actions)(withRouter(Upperheader));