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
			clicked: false,
			word: ''
		};
	}
	searchHandle = (e) => {
		this.setState({
			word: e.target.value
		})
	}
	checkParams = () => {
		if (Object.keys(this.props.match.params).length===0) {
			if(localStorage.getItem('userAuth')) {
				this.props.history.push(`/homepage/${localStorage.getItem('userAuth')}`)
			} else if (store.getState().token) {
				this.props.history.push(`/homepage/${store.getState().token}`)
			}
		}
	}
	handleLogout() {
		this.props.Logout()
		this.props.history.push('/')
	}
	handleKeyDown = (e) => {
    if (e.keyCode === 13) {
			this.props.getUniversity(this.state.word, 'name')
			if (this.props.match.path==='/search/:id') {
				let paramId = JSON.parse(this.props.match.params.id)
				let object = {
					word:e.target.value.toLowerCase(),
					user: paramId.user
				}
				this.props.history.push(`/search/${JSON.stringify(object)}`)
			} else {
				let object = {
					word:e.target.value.toLowerCase(),
					user: this.props.match.params.id
				}
				this.props.history.push(`/search/${JSON.stringify(object)}`)
			}
    }
  }
	componentDidMount() {
		this.checkParams()
	}
	render() {
		let path = this.props.match.path
		let paramData = this.props.match.params.id
		let uniquePath = ''
		let listUnivPath = ''
		if(path==='/search/:id') {
			let dataString = JSON.parse(paramData)
			if(dataString.user) {
				uniquePath = '/homepage/' + dataString.user
				listUnivPath = '/universities/'+ dataString.user
			} else {
				uniquePath = '/'
				listUnivPath = '/universities'
			}
		} else {
			if (paramData) {
				uniquePath = '/homepage/' + paramData
				listUnivPath = '/universities/' + paramData
			} else {
				uniquePath = '/'
				listUnivPath = '/universities'
			}
		}
		return (
			<React.Fragment>
				<div className="container-fluid head-upper">
					<div className='row'>
						<div className='col-lg-12 pad-zero'>
							<nav class="navbar navbar-expand-lg navbar-light bg-blue row">
								<div className='col-lg-3 col-md-9 col-sm-9 col-9 text-left pb-15'>
									<Link className="navbar-brand brand-name" to={location=>`${uniquePath}`}>
										<span className='bold-white font-size-24'>
											Info
										</span>
										<span className='color-white font-light font-size-24'>
											versity
										</span>
									</Link>
								</div>
								<div className='col-lg-1 col-md-3 col-sm-3 col-3 pb-15'>
									<button class="navbar-toggler distance" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
										<span class="navbar-toggler-icon"></span>
									</button>
								</div>
								<div className='col-lg-8'>
									<div class="collapse navbar-collapse" id="navbarSupportedContent">
											<div class="md-form">
												<input class="form-control" type="text" onChange={(e)=>this.searchHandle(e)} onKeyDown={this.handleKeyDown} placeholder="Search by Name" aria-label="Search"/>
											</div>
										<ul class="navbar-nav mr-auto nav-style ">
											<li class="nav-item active distance">
												<Link class="nav-link main-menu" to={location=>`${listUnivPath}`}>List University <span class="sr-only">Projects</span></Link>
											</li>
											{
												this.props.match.params.id?
												<li class="nav-item distance">
													<Link onClick={()=>this.handleLogout()} to='/' class="nav-link main-menu">Logout</Link>
												</li>
												:
												<React.Fragment>
													<li class="nav-item distance">
														<Link class="nav-link main-menu" to="/register">Register</Link>
													</li>
													<li class="nav-item distance">
														<Link class="nav-link main-menu" to="/login">Login</Link>
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