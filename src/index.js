import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { auth } from './helpers/firebase';
import Dashboard from './pages/dashboard';
import Login from './pages/login';

import './index.css';

const App = () => {
	const [ user, setUser ] = useState(null);
	const [ isAuthReady, setIsAuthReady ] = useState(false);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			setIsAuthReady(true);
			user && setUser(user);
		});
	}, []);

	return (
		<Router>
			<div className="app">
				<Switch>
					<Route path="/" exact>
						<Dashboard />
						{isAuthReady && !user && <Redirect to="/login" />}
					</Route>
					<Route path="/login" exact>
						<Login />
						{isAuthReady && user && <Redirect to="/" />}
					</Route>
					<Route path="/new">New</Route>
					<Route path="/:id/edit">Edit</Route>
					<Route path="/:id">Event</Route>
				</Switch>
			</div>
		</Router>
	);
};

ReactDOM.render(<App />, document.getElementById('app'));
