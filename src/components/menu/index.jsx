import React, { useState, useEffect } from 'react';
import Button from '../button';
import Header from '../header';
import Spinner from '../spinner';
import Tabs, { TabPanel } from '../tabs';
import { redirect } from '../../helpers/router';
import './styles.css';

const Menu = () => {
    const [loading, setLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState('all-events');

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <div className="menu">
            <Header />
            <div className="menu__content">
                {
                    loading
                        ? (
                            <div className="menu__loading">
                                <Spinner color={'var(--primary-color)'} />
                            </div>
                        )
                        : (
                            <Tabs
                                currentTab={currentTab}
                                onChange={tabId => setCurrentTab(tabId)}
                                title="Events"
                            >
                                <TabPanel
                                    id="all-events"
                                    title="All Events"
                                >
                                    ALL EVENTS
                                </TabPanel>
                                <TabPanel
                                    id="my-events"
                                    title="My Events"
                                >
                                    MY EVENTS
                                </TabPanel>
                            </Tabs>
                        )
                }
            </div>
            <Button fab onClick={() => redirect('new')}>
                +
            </Button>
        </div>
    )
};

export default Menu;