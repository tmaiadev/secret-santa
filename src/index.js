import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { auth } from './helpers/firebase';
import Container from './components/container';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import NewEvent from './pages/new';
import Spinner from './components/spinner';

import './index.css';

const App = () => {
	const [ user, setUser ] = useState(null);
	const [ isAuthReady, setIsAuthReady ] = useState(false);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			user && setUser(user);
			setIsAuthReady(true);
		});
	}, []);

	return (
		<Router>
			<div className="app">
				{isAuthReady ? (
					<Switch>
						<Route path="/" exact>
							<Dashboard user={user} />
							{!user && <Redirect to="/login" />}
						</Route>
						<Route path="/login" exact>
							<Login />
							{user && <Redirect to="/" />}
						</Route>
						<Route path="/new" exact>
							<NewEvent user={user} />
							{!user && <Redirect to="/" />}
						</Route>
						<Route path="/:id/edit">Edit</Route>
						<Route path="/:id">Event</Route>
					</Switch>
				) : (
					<Container center spread>
						<Spinner />
					</Container>
				)}
			</div>
		</Router>
	);
};

ReactDOM.render(<App />, document.getElementById('app'));
