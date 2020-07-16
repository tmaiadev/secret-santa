import React, { useState, useEffect, useCallback, Fragment } from 'react';
import PropTypes from 'prop-types';

import { db } from '../helpers/firebase';
import Button from '../components/button';
import Container from '../components/container';
import Header from '../components/header';
import Link from '../components/link';
import PageLayout, { PageBody } from '../components/page-layout';
import Spinner from '../components/spinner';
import SrOnly from '../components/sr-only';
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

const orderByDateAsc = (a, b) => (a.datetime.toDate() > b.datetime.toDate() ? 1 : 0);
const filterUpcoming = ({ datetime }) => datetime.toDate() >= new Date();
const filterSorted = ({ sorted }) => !!sorted;
const filterPast = ({ datetime }) => datetime.toDate() < new Date();

const NoEvents = () => (
	<Container center spread>
		No events.
	</Container>
);

const Dashboard = ({ user }) => {
	const [ activeTab, setActiveTab ] = useState(TABS[0].key);
	const [ showSpinner, setShowSpinner ] = useState(false);
	const [ events, setEvents ] = useState([]);
	const [ error, setError ] = useState(false);
	const upcomingEvents = [ ...events ].filter(filterUpcoming);
	const sortedEvents = [ ...events ].filter(filterSorted);
	const pastEvents = [ ...events ].filter(filterPast);

	const getEvents = useCallback(
		async () => {
			setError(false);
			setShowSpinner(true);

			try {
				const fieldPath = `participants.${user.uid}.displayName`;
				const querySnapshot = await db.collection('events').where(fieldPath, '>=', '').get();
				const events = [];

				querySnapshot.forEach((doc) =>
					events.push({
						id: doc.id,
						...doc.data()
					})
				);

				setEvents(events.sort(orderByDateAsc));
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
				{error || showSpinner ? (
					<Fragment>
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
							<Container center spread>
								<Spinner />
							</Container>
						)}
					</Fragment>
				) : (
					<Fragment>
						<TabPanel activeTabKey={activeTab} tabKey="upcoming">
							{upcomingEvents.length === 0 ? <NoEvents /> : upcomingEvents.toString()}
						</TabPanel>
						<TabPanel activeTabKey={activeTab} tabKey="sorted">
							{sortedEvents.length === 0 ? <NoEvents /> : sortedEvents.toString()}
						</TabPanel>
						<TabPanel activeTabKey={activeTab} tabKey="past">
							{pastEvents.length === 0 ? <NoEvents /> : pastEvents.toString()}
						</TabPanel>
					</Fragment>
				)}
				<div className="dashboard-page__new-button-wrapper">
					<Link href="/new" filled round>
						<ion-icon name="add-outline" />
						<SrOnly>Add New Event</SrOnly>
					</Link>
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
