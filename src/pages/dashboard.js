import React, { useState, useEffect, useCallback, Fragment } from 'react';
import PropTypes from 'prop-types';

import { db } from '../helpers/firebase';
import Button from '../components/button';
import Container from '../components/container';
import Header from '../components/header';
import PageLayout, { PageBody } from '../components/page-layout';
import Spinner from '../components/spinner';
import Tabs, { TabPanel } from '../components/tabs';

import './dashboard.css';

const TABS = [
	{
		key: 'upcoming',
		label: 'Upcoming'
	},
	{
		key: 'sorted',
		label: 'Sorted'
	},
	{
		key: 'past',
		label: 'Past'
	}
];

const Dashboard = ({ user }) => {
	const [ activeTab, setActiveTab ] = useState(TABS[0].key);
	const [ showSpinner, setShowSpinner ] = useState(false);
	const [ events, setEvents ] = useState([]);
	const [ error, setError ] = useState(false);

	const getEvents = useCallback(
		async () => {
			setError(false);
			setShowSpinner(true);

			try {
				const querySnapshot = await db
					.collection('events')
					.where('participants', 'array-contains', user.uid)
					.get();
				const events = [];

				querySnapshot.forEach((doc) =>
					events.push({
						id: doc.id,
						...doc.data()
					})
				);

				setEvents(events);
			} catch (_) {
				setError(true);
			} finally {
				setShowSpinner(false);
			}
		},
		[ user ]
	);

	useEffect(
		() => {
			getEvents();
		},
		[ getEvents ]
	);

	return (
		<PageLayout>
			<Header>
				<Tabs activeTabKey={activeTab} tabs={TABS} onChange={setActiveTab} label="Filters" />
			</Header>
			<PageBody>
				<div className="dashboard-page">
					<Container fullHeight center={error || showSpinner}>
						{error || showSpinner ? (
							<div className="dashboard-page__alert-container">
								{error ? (
									<div className="dashboard-page__alert">
										<div>An error has occurred. Check your Internet connection and try again.</div>
										<div>
											<Button onClick={getEvents}>
												Retry <ion-icon name="refresh-outline" />
											</Button>
										</div>
									</div>
								) : (
									<Spinner />
								)}
							</div>
						) : (
							<Fragment>
								<TabPanel activeTabKey={activeTab} tabKey="upcoming">
									{events.toString()}
								</TabPanel>
								<TabPanel activeTabKey={activeTab} tabKey="sorted">
									Sorted
								</TabPanel>
								<TabPanel activeTabKey={activeTab} tabKey="past">
									Past
								</TabPanel>
							</Fragment>
						)}
					</Container>
				</div>
			</PageBody>
		</PageLayout>
	);
};

Dashboard.propTypes = {
	user: PropTypes.shape({
		uid: PropTypes.string.isRequired,
		displayName: PropTypes.string.isRequired
	}).isRequired
};

export default Dashboard;
