import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'unistore/react';
import { store } from '../store';
import { Route } from 'react-router';
import HomePage from '../pages/index';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register'
        
const MainRoute = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route exact path='/login' component={LoginPage} />
					<Route exact path='/register' component={RegisterPage} />
					<Route path='/:id' component={HomePage} />
				</Switch>
			</BrowserRouter>
		</Provider>
	)
}
export default MainRoute;