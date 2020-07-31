import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'unistore/react';
import { store } from '../store';
import { Route } from 'react-router';
import HomePage from '../pages/index';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import SearchPage from '../pages/searchResult';
import ListUniversities from '../pages/listUniversities';
        
const MainRoute = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route exact path='/login' component={LoginPage} />
					<Route exact path='/search' component={SearchPage} />
					<Route exact path='/register' component={RegisterPage} />
					<Route exact path='/universities' component={ListUniversities} />
					<Route path='/universities/:id' component={ListUniversities} />
					<Route path='/homepage/:id' component={HomePage} />
					<Route path='/search/:id' component={SearchPage} />
				</Switch>
			</BrowserRouter>
		</Provider>
	)
}
export default MainRoute;