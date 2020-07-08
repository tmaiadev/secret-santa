import React, { useState } from 'react';

import Header from '../components/header';
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
		<div className="dashboard-page">
			<Header>
				<Tabs activeTabKey={activeTab} tabs={TABS} onChange={setActiveTab} label="Filters" />
			</Header>
			<TabPanel activeTabKey={activeTab} tabKey="upcoming">
				Upcoming
			</TabPanel>
			<TabPanel activeTabKey={activeTab} tabKey="sorted">
				Sorted
			</TabPanel>
			<TabPanel activeTabKey={activeTab} tabKey="past">
				Past
			</TabPanel>
		</div>
	);
};

export default Dashboard;
