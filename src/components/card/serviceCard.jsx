import React, { Component } from 'react';
import '../../styles/css/main.css'
import '../../styles/css/bootstrap.min.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { withRouter } from 'react-router-dom'
import { connect } from 'unistore/react'
import { store, actions } from '../../store'

class Bottomheader extends Component {
	componentDidMount() {
		if(this.props.match.path==="/search/:id") {
			let params = this.props.match.params
			let data = JSON.parse(params.id)
			this.props.getUniversity(data.word,'name')
			this.props.checkUserData(Object.keys(this.props.match.params).length, data.user)
		} else {
			this.props.getUniversity()
			this.props.checkUserData(Object.keys(this.props.match.params).length, this.props.match.params.id)
		}
	}
	doFavorite(univId) {
		if(this.props.match.path==="/search/:id") {
			let params = this.props.match.params
			let data = JSON.parse(params.id)
			this.props.favoriteUniversities(data.user, univId)
			this.props.history.push(`/search/${this.props.match.params.id}`)
		} else if (this.props.match.path==="/universities/:id") {
			this.props.favoriteUniversities(this.props.match.params.id, univId)
			this.props.history.push(`/universities/${this.props.match.params.id}`)
		} else {
			this.props.favoriteUniversities(this.props.match.params.id, univId)
			this.props.history.push(`/homepage/${this.props.match.params.id}`)
		}
	}
	
	render() {
		let data = store.getState().infoData
		let user = store.getState().userData
		let listFavorite = []
		Object.keys(user).map((id)=>{
			if(Array.isArray(user[id])) {
				listFavorite = user[id]
			}
			return id
		})
		let loading = ['1','2','3','4','5','6']
		if (data.length===0||Object.keys(user).length===0) {
			if(Object.keys(this.props.match.params).length===0 || this.props.match.path==="/search" || this.props.match.path==="/universities"|| this.props.match.path==="/search/:id" || this.props.match.path==="/universities/:id") {
				let styleClass =  'container-fluid mt-20 mb-60 service-style'
				let styleWord = 'mt-60 mb-60'
				let styleCard = 'fl-r side-style'
				if (this.props.loading) {
					let styleClassLoading =  'container-fluid mt-20 mb-60 service-style'
					if(this.props.match.path==="/universities/:id" || this.props.match.path==="/universities") {
						styleClassLoading =  'container-fluid mt-20 mb-60 service-style-search-univ'
					} else if (this.props.match.path==="/search"|| this.props.match.path==="/search/:id") {
						styleClassLoading =  'container-fluid mt-20 mb-60 service-style-search'
					}
					return (
						<React.Fragment>
							<div className={styleClassLoading}>
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
					if(this.props.match.path==="/search"|| this.props.match.path==="/search/:id") {
						styleWord = 'mt-60 mb-60 display-style'
						styleClass =  'container-fluid mt-20 mb-60 service-style-search'
					} else if (this.props.match.path==="/universities" || this.props.match.path==="/universities/:id") {
						styleWord = 'mt-60 mb-60 display-style'
						styleClass =  'container-fluid mt-20 mb-60 service-style-search-univ'
						styleCard = 'fl-r side-style-mini'
					}
					return (
						<React.Fragment>
							<div className={styleClass}>
								<div className={styleWord}>
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
												<span className={styleCard}>
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
													{
													(	Object.keys(this.props.match.params).length===0 || this.props.match.path==="/search/:id")? 
														<span></span>
														:
														<span style={{fontSize:'24px'}}>
															<i id={index} onClick={()=>this.doFavorite(item.name)} className="far fa-heart"></i>
														</span>
													}
												</div>
												:
												<div>
													{
														listFavorite.includes(item.name)?
														<span style={{fontSize:'24px',color:'red'}}>
															<i id={index} onClick={()=>this.doFavorite(item.name)} className="fas fa-heart"></i>
														</span>
														:
														<span style={{fontSize:'24px'}}>
															<i id={index} onClick={()=>this.doFavorite(item.name)} className="far fa-heart"></i>
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
			} else {
				let styleClass =  'container-fluid mt-20 mb-60 service-style'
				let styleWord = 'mt-60 mb-60'
				if(this.props.match.path==="/search"|| this.props.match.path==="/search/:id") {
					styleWord = 'mt-60 mb-60 display-style'
					styleClass =  'container-fluid mt-20 mb-60 service-style-search'
				} else if (this.props.match.path==="/universities" || this.props.match.path==="/universities/:id") {
					styleWord = 'mt-60 mb-60 display-style'
					styleClass =  'container-fluid mt-20 mb-60 service-style-search-univ'
				}
				return (
					<React.Fragment>
						<div className={styleClass}>
							<div className={styleWord}>
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
			}
		} else {
			let styleClass =  'container-fluid mt-20 mb-60 service-style'
			let styleWord = 'mt-60 mb-60'
			let styleCard = 'fl-r side-style'
			if(this.props.match.path==="/search/:id"||this.props.match.path==="/search/:id/:userid") {
				styleClass =  'container-fluid mt-20 mb-60 service-style-search'
			}
			if(this.props.match.path==="/search"|| this.props.match.path==="/search/:id") {
				styleWord = 'mt-60 mb-60 display-style'
				styleClass =  'container-fluid mt-20 mb-60 service-style-search'
			} else if (this.props.match.path==="/universities" || this.props.match.path==="/universities/:id") {
				styleWord = 'mt-60 mb-60 display-style'
				styleClass =  'container-fluid mt-20 mb-60 service-style-search-univ'
				styleCard = 'fl-r side-style-mini'
			}
 			return (
				<React.Fragment>
					<div className={styleClass}>
						<div className={styleWord}>
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
										<span className={styleCard}>
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
											{
												Object.keys(this.props.match.params).length===0? 
												<span></span>
												:
												<span style={{fontSize:'24px'}}>
													<i id={index} onClick={()=>this.doFavorite(item.name)} className="far fa-heart"></i>
												</span>
											}
										</div>
										:
										<div>
											{
												listFavorite.includes(item.name)?
												<span style={{fontSize:'24px',color:'red'}}>
													<i id={index} onClick={()=>this.doFavorite(item.name)} className="fas fa-heart"></i>
												</span>
												:
												<span style={{fontSize:'24px'}}>
													<i id={index} onClick={()=>this.doFavorite(item.name)} className="far fa-heart"></i>
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

export default connect("infoData, userData, loading",actions)(withRouter(Bottomheader));