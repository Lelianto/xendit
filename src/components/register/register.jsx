import React from 'react';
import '../../styles/css/index.css';
import '../../styles/css/main.css'
import '../../styles/css/bootstrap.min.css';
import { withRouter, Link, Redirect } from 'react-router-dom'
import { connect } from 'unistore/react'
import { actions, store } from '../../store'

class SignUp extends React.Component {
  /** 
    * @function handlePass  function for handling see password
  */
	handlePass = () => {
		if (this.props.typeText === "password") {
			store.setState({
				typeText:"textmail"
			})
		} else {
			store.setState({
				typeText:"password"
			})
		}
	}

  /** 
    * @function doRegister  function for handling register
  */
  doRegister = async () => {
		await this.props.postRegister()
    if (this.props.successRegitration){
      store.setState({
        typeText:"password"
			})
			store.setState({
				successRegitration: false
			})
      this.props.history.push("/login");
    } else {
      return <Redirect to={{ pathname: "/register" }} />;
    }
	}

  render() { 
		if(this.props.successRegitration) {
			store.setState({
				successRegitration: false
			})
			return <Redirect to={{ pathname: "/login" }} />;
		}
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
					<div className="fadeIn first">
						<div className='padding-brand'>
							<Link className="navbar-brand brand-name" to="/">
								<span className='bold-black font-size-32'>
									Info
								</span>
								<span className='color-black font-light font-size-32'>
									versity
								</span>
							</Link>
						</div>
					</div>
          {/* <!-- Login Form --> */}
					<form onSubmit={e => e.preventDefault()}>
						<input 
							type="email" 
							id="login" 
							className="fadeIn second" 
							name="email" 
							placeholder="Email"
							onChange={e => this.props.changeInput(e)} />
						<input 
							type={this.props.typeText} 
							id="password" 
							className="fadeIn third" 
							name="password" 
							placeholder="Password"
							onChange={e => this.props.changeInput(e)} />
						<p></p>
						<input 
							style={{fontSize:'12px', textAlign:'left'}} 
							type="checkbox" 
							onClick={this.handlePass}/>&nbsp; Show Password
						<p></p>
						<input 
						type="submit" 
						className="fadeIn fourth" 
						value="Register" 
						onClick={this.doRegister}/>
					</form>
					{/* <!-- Back to Home --> */}
					<div id="formFooter">
					<Link style={{textDecoration:'none'}} className="underlineHover" to="/">Back to Home</Link>
					</div>
        </div>
      </div>
    )
  }
}

export default connect("typeText, successRegitration, email, password",actions)(withRouter(SignUp));