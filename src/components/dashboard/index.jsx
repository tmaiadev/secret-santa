import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Menu from '../menu';
import TabTrap from '../tabtrap';
import { subscribe, redirect } from '../../helpers/router';
import './styles.css';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('menu');
  const menuRef = useRef();
  const mainRef = useRef();

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
    const { current: view } = currentView === 'menu' ? menuRef : mainRef;
    let hasTransitionStarted = false;
    
    view.addEventListener('transitionstart', () => {
      hasTransitionStarted = true;
      view.addEventListener('transitionend', () => view.focus(), { once: true });
    }, { once: true });

    setTimeout(() => {
      if (hasTransitionStarted === false) view.focus();
    }, 300);
  }, [currentView]);

  return (
    <div className={`dashboard ${ currentView === 'main' && 'dashboard--main' }`}>
      <TabTrap onFocus={() => menuRef.current.focus()} />
      <div ref={menuRef} className="dashboard__menu" tabIndex="0">
        <Menu />
        <TabTrap onFocus={() => menuRef.current.focus()} />
      </div>
      <TabTrap onFocus={() => mainRef.current.focus()} />
      <div ref={mainRef} className="dashboard__main" tabIndex="0">
        <div className="dashboard__main__no-content">
          No content
          <button onClick={ () => redirect('') }>Go Back</button>
        </div>
        <TabTrap onFocus={() => mainRef.current.focus()} />
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