import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { db } from '../helpers/firebase';
import Button from '../components/button';
import Container from '../components/container';
import Header, { HeaderNav } from '../components/header';
import Heading from '../components/heading';
import Input from '../components/input';
import PageLayout, { PageBody } from '../components/page-layout';
import Spinner from '../components/spinner';

import './new.css';

const NewEvent = ({ user }) => {
	const [ loading, setLoading ] = useState(false);
	const history = useHistory();

	const onSubmit = async (evt) => {
		evt.preventDefault();

		const formData = new FormData(evt.target);
		const name = formData.get('name');
		const datetime = formData.get('datetime');
		const description = formData.get('description');

		setLoading(true);
		try {
			const { displayName, photoURL, uid } = user;

			const newEventDoc = await db.collection('events').add({
				datetime: new Date(datetime),
				name,
				description,
				host: uid,
				sorted: false,
				cancelled: false,
				participants: {
					[uid]: {
						photoURL,
						displayName
					}
				}
			});

			history.push('/' + newEventDoc.id);
		} catch (_) {
			console.log(_);
			alert('Something went wrong. Check your Internet connection and try again.');
			setLoading(false);
		}
	};

	return (
		<PageLayout>
			<Header>
				<HeaderNav />
			</Header>
			<PageBody>
				<form onSubmit={onSubmit} className="new-page__form">
					<Heading center>New Event</Heading>
					<Input name="name" id="name" label="Event Name" placeholder="Example: Office party" required />
					<Input id="datetime" label="Date and Time" name="datetime" required type="datetime-local" />
					<Input
						id="description"
						label="Description"
						name="description"
						placeholder="Example: Address, budget limit, theme..."
						type="textarea"
					/>
					<Container textRight>
						<Button type="submit" filled disabled={loading}>
							{loading ? <Spinner /> : 'Create'}
						</Button>
					</Container>
				</form>
			</PageBody>
		</PageLayout>
	);
};

NewEvent.propTypes = {
	user: PropTypes.shape({
		displayName: PropTypes.string.isRequired,
		photoURL: PropTypes.string.isRequired,
		uid: PropTypes.string.isRequired
	}).isRequired
};

export default NewEvent;
