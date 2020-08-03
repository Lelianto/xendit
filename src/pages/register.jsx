import React, { Component } from 'react';
import Register from '../components/register/register';
import '../styles/css/index.css';

class RegisterPage extends Component {
  render() {
    return (
      <div className='bodylogin'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
            <Register/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterPage;