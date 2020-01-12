import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Header from '../header';
import TabTrap from '../tabtrap';
import { subscribe, redirect } from '../../helpers/router';
import './styles.css';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('menu');
  const $menu = useRef();
  const $main = useRef();

  useEffect(() => {
    const routerListener = subscribe(route => {
      if (route) {
        setCurrentView('main');
      } else {
        setCurrentView('menu');
      }
    });
  
    return () => routerListener.unsubscribe();
  }, []);

  useEffect(() => {
    const $viewRef = currentView === 'menu'
      ? $menu
      : $main;

    $viewRef.current.focus();
  }, [currentView]);

  return (
    <div className={ `dashboard ${ currentView === 'main' && 'dashboard--main' }` }>
      <div ref={$menu} className="dashboard__menu" tabIndex="0">
        <Header />
        <button onClick={ () => redirect('123') }>Go To Main</button>
        <TabTrap onFocus={() => $menu.current.focus()} />
      </div>
      <div ref={$main} className="dashboard__main" tabIndex="0">
        <div className="dashboard__main__no-content">
          No content
        </div>
        <TabTrap onFocus={() => $main.current.focus()} />
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    photoUrl: PropTypes.string
  }).isRequired
}

export default Dashboard;