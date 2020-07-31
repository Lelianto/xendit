import React, { Component } from 'react';
import '../styles/css/main.css'
import '../styles/css/bootstrap.min.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { withRouter } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../store'

class Bottomheader extends Component {
	componentDidMount() {
		this.props.getUniversity()
		this.props.checkUserData(this.props.match.params.id)
	}
	doFavorite(univId) {
		this.props.favoriteUniversities(this.props.match.params.id, univId)
		this.props.history.push(`/${this.props.match.params.id}`)
	}
	render() {
		let data = store.getState().infoData
		let user = store.getState().userData
		let listFavorite = []
		Object.keys(user).map((id)=>{
			if(Array.isArray(user[id])) {
				listFavorite = user[id]
			}
		})
		let loading = ['1','2','3','4','5','6']
		if (data.length===0||Object.keys(user).length===0) {
			return (
				<React.Fragment>
					<div className='container-fluid mt-20 mb-60 service-style'>
						<div className='mt-60 mb-60'>
							<span className='title-help fs-48'>
								Need Some Information About Your Dream University?
							</span>
							<br/>
							<span className='fs-24'>
								We try to provide a solution to the lack of resources to find information related to your dream university. We connect you to the website of each university.
							</span>
						</div>
						<div className='row'>
							{loading.map((item)=>
							<div className='col-lg-4 col-md-6 col-sm-12 mt-20 mb-12 text-left'>
								<div className='service-card'>
									<div className='mb-12'>
										<SkeletonTheme color="#0779e4" highlightColor="blue">
											<p>
												<Skeleton />
											</p>
										</SkeletonTheme>
										<SkeletonTheme color="#86c4ba" highlightColor="#b2ebf2">
											<p>
												<Skeleton count={2}/>
											</p>
										</SkeletonTheme>
									</div>
								</div>
							</div>
							)}
						</div>
					</div>
				</React.Fragment>
			)
		} else {
			return (
				<React.Fragment>
					<div className='container-fluid mt-20 mb-60 service-style'>
						<div className='mt-60 mb-60'>
							<span className='title-help fs-48'>
								Need Some Information About Your Dream University?
							</span>
							<br/>
							<span className='fs-24'>
								We try to provide a solution to the lack of resources to find information related to your dream university. We connect you to the website of each university.
							</span>
						</div>
						<div className='row'>
							{data.map((item, index)=>
							<div className='col-lg-4 col-md-6 col-sm-12 mt-20 mb-12 text-left'>
								<div className='service-card'>
									<div className='mb-12'>
										<span className='text-truncate fs-16 font-weight-bold'>
											{item.name}
										</span>
										<span className='fl-r side-style'>
											{item.country}
										</span>
									</div>
									<div className='fs-16 pb-8'>
										<a href={item.web_pages[0]} target="_blank" rel="noopener noreferrer">
											{item.web_pages[0]}
										</a>
									</div>
									{
										listFavorite.length===0?
										<div>
											<span style={{fontSize:'24px'}}>
												<i id={index} onClick={()=>this.doFavorite(item.name)} class="far fa-heart"></i>
											</span>
										</div>
										:
										<div>
											{
												listFavorite.includes(item.name)?
												<span style={{fontSize:'24px',color:'red'}}>
													<i id={index} onClick={()=>this.doFavorite(item.name)} class="fas fa-heart"></i>
												</span>
												:
												<span style={{fontSize:'24px'}}>
													<i id={index} onClick={()=>this.doFavorite(item.name)} class="far fa-heart"></i>
												</span>
											}
										</div>
									}
								</div>
							</div>
							)}
						</div>
					</div>
				</React.Fragment>
			)
		}
	} 
}

export default connect("infoData, userData",actions)(withRouter(Bottomheader));