import React, { useState } from 'react';

import Container from '../components/container';
import Header from '../components/header';
import PageLayout, { PageBody } from '../components/page-layout';
import Tabs, { TabPanel } from '../components/tabs';

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

const Dashboard = () => {
	const [ activeTab, setActiveTab ] = useState(TABS[0].key);

	return (
		<PageLayout>
			<Header>
				<Tabs activeTabKey={activeTab} tabs={TABS} onChange={setActiveTab} label="Filters" />
			</Header>
			<PageBody>
				<Container>
					<TabPanel activeTabKey={activeTab} tabKey="upcoming">
						Upcoming
					</TabPanel>
					<TabPanel activeTabKey={activeTab} tabKey="sorted">
						Sorted
					</TabPanel>
					<TabPanel activeTabKey={activeTab} tabKey="past">
						Past
					</TabPanel>
				</Container>
			</PageBody>
		</PageLayout>
	);
};

export default Dashboard;
