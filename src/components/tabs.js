import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import classNameBuilder from '../helpers/classNameBuilder';

import './tabs.css';

export const Tab = ({ active, children, tabKey, onClick }) => (
	<button
		aria-controls={`${tabKey}-tabpanel`}
		aria-selected={active}
		className={classNameBuilder('tab', { 'tab--active': active })}
		id={`${tabKey}-tab`}
		onClick={onClick}
		role="tab"
		tabIndex="-1"
	>
		{children}
	</button>
);

Tab.propTypes = {
	active: PropTypes.bool,
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
	tabKey: PropTypes.string.isRequired
};

export const TabPanel = ({ activeTabKey, children, tabKey }) => {
	const active = activeTabKey === tabKey;

	return (
		<div
			aria-labelledby={`${tabKey}-tab`}
			hidden={active ? undefined : 'hidden'}
			id={`${tabKey}-tabpanel`}
			role="tabpanel"
			tabIndex="0"
		>
			{children}
		</div>
	);
};

TabPanel.propTypes = {
	activeTabKey: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	tabKey: PropTypes.string.isRequired
};

const TabList = ({ activeTabKey, onChange, tabs }) => {
	const tablistRef = useRef();

	useEffect(
		() => {
			const el = tablistRef.current;

			function onKeyDown(evt) {
				const { key, shiftKey } = evt;
				const currTabIndex = tabs.findIndex(({ key }) => key === activeTabKey);
				let nextTabIndex = currTabIndex;

				switch (key) {
					case 'ArrowRight':
						nextTabIndex = currTabIndex + 1;

						if (nextTabIndex > tabs.length - 1) nextTabIndex = 0;
						break;

					case 'ArrowLeft':
						nextTabIndex = currTabIndex - 1;

						if (nextTabIndex < 0) nextTabIndex = tabs.length - 1;
						break;

					case 'Home':
						nextTabIndex = 0;
						break;

					case 'End':
						nextTabIndex = tabs.length - 1;
						break;

					case 'Tab':
						if (!shiftKey) {
							const tabPanelId = `${tabs[currTabIndex].key}-tabpanel`;
							const tab = document.getElementById(tabPanelId);
							if (tab) {
								evt.preventDefault();
								tab.focus();
							}
						}
						return;

					default:
						return;
				}

				onChange(tabs[nextTabIndex].key);
			}

			el.addEventListener('keydown', onKeyDown);
			return () => {
				el.removeEventListener('keydown', onKeyDown);
			};
		},
		[ activeTabKey, onChange, tabs ]
	);

	return (
		<div className="tab-list" ref={tablistRef} role="tablist" tabIndex="0">
			{tabs.map(({ key, label }) => (
				<Tab key={key} tabKey={key} active={key === activeTabKey} onClick={() => onChange(key)}>
					{label}
				</Tab>
			))}
		</div>
	);
};

TabList.propTypes = {
	activeTabKey: PropTypes.string,
	label: PropTypes.string.isRequired,
	tabs: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired
		})
	).isRequired,
	onChange: PropTypes.func.isRequired
};

export default TabList;
