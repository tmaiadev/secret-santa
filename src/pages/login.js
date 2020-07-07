import React, { useState } from 'react';

import Button from '../components/button';
import Link from '../components/link';
import Logo from '../components/logo';
import Spinner from '../components/spinner';
import { auth, googleAuthProvider } from '../helpers/firebase';

import './login.css';

const Login = () => {
	const [ loading, setLoading ] = useState(false);

	const login = () => {
		setLoading(true);
		auth.signInWithPopup(googleAuthProvider).finally(() => setLoading(false));
	};

	return (
		<div className="login-page">
			<div className="login-page__content">
				<Logo vwScale />
				{loading ? <Spinner /> : <Button onClick={login}>Start</Button>}
			</div>
			<footer className="login-page__footer">
				Developed by
				<Link href="https://thallesmaia.com" target="_blank">
					Thalles Maia
				</Link>
			</footer>
		</div>
	);
};

export default Login;
