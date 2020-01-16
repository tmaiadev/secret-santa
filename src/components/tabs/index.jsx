import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export const TabPanel = ({ id, children }) => {
  return (
    <div
      role="tabpanel"
      id={`${id}-tabpanel`}
      className="tab-panel"
      aria-labelledby={`${id}-tab`}
    >
      <div className={`tab-panel__wrapper`}>
        {children}
      </div>
    </div>
  );
};

TabPanel.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const Tabs = ({
  currentTab,
  children,
  onChange,
  title
}) => {
  const wrapperRef = useRef();
  const highlightRef = useRef();
  const tabpanelsRef = useRef();
  const railsRef = useRef();
  const tabs = children
    .map(({ props: { id, title } }) => (
      <button
        role="tab"
        key={id}
        id={`${id}-tab`}
        className={`tabs__tab ${currentTab === id && 'tabs__tab--active'}`}
        aria-selected={id === currentTab}
        aria-controls={`${id}-tabpanel`}
        tabIndex={id === currentTab ? '0' : '-1'}
        onClick={({ target }) => onChange(sanitizeTabId(target.id))}
      >
        {title}
      </button>
    ));

  const sanitizeTabId = id => id.replace(/-(tab|tabpanel)$/, '');

  // Tab navigation highlight calculation
  useEffect(() => {
    const { current: $wrapper } = wrapperRef;
    const { current: $highlight } = highlightRef;

    const calculatePosition = () => {
      const $activeTab = document.getElementById(`${currentTab}-tab`);
      $highlight.style.width = `${$activeTab.clientWidth}px`;
    
      const wrapperOffset = $wrapper.getBoundingClientRect().left;
      const offset = $activeTab.getBoundingClientRect().left - wrapperOffset;
      $highlight.style.transform = `translateX(${offset}px)`;
    };

    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    return () => window.removeEventListener('resize', calculatePosition);
  }, [currentTab]);

  // Switching tab panels animation
  useEffect(() => {
    const { current: $rails } = railsRef;
    const allTabPanels = Array.from($rails.querySelectorAll('.tab-panel'));

    const activateTabPanel = $node => {
      $node.setAttribute('tabindex', '0');
      $node.querySelector('.tab-panel__wrapper').hidden = '';
    };

    const deactivateTabPanel = $node => {
      $node.setAttribute('tabindex', '-1');
      $node.querySelector('.tab-panel__wrapper').hidden = 'hidden';
    };

    // Right before the animation starts, we activate all
    // tab panels, so they are visible for the animation
    allTabPanels.forEach($t => activateTabPanel($t));

    // Paint
    requestAnimationFrame(() => {
      // Calculate how much the rail should move and animate it
      const { current: $tabpanels } = tabpanelsRef;
      const panelWidth = $tabpanels.clientWidth;
      const currentTabIndex = children.findIndex(tab => tab.props.id === currentTab);
      const offset = currentTabIndex * panelWidth;
      let hasTransitionStarted = false;

      // Once the animation is over, we deactivate all inactive tab panels
      const deactivateInactiveTabs = () => {
        allTabPanels
          .forEach($t => 
            sanitizeTabId($t.id) === currentTab
              ? activateTabPanel($t)
              : deactivateTabPanel($t)
          );
      };

      $rails.style.transform = `translateX(${offset * -1}px)`;
      $rails.addEventListener('transitionstart', () => {
        hasTransitionStarted = true;
        $rails.addEventListener('transitionend', deactivateInactiveTabs, { once: true });
      }, { once: true });

      // If the offset is set to the same value
      // the transition is not triggered.
      // So we deactivate the inactive tabs manually.
      setTimeout(() => hasTransitionStarted === false && deactivateInactiveTabs(), 300);
    });
  }, [children, currentTab]);

  const keyboardNavigation = ({ key }) => {
    const ARROW_RIGHT = 'ArrowRight';
    const ARROW_LEFT = 'ArrowLeft';
    const HOME = 'Home';
    const END = 'End';
    const ALLOWED_KEYS = [ARROW_RIGHT, ARROW_LEFT, HOME, END];

    if (ALLOWED_KEYS.indexOf(key) === -1) return;

    const currentTabIndex = children.findIndex(tab => tab.props.id === currentTab);
    let nextTabIndex;

    switch (key) {
      case ARROW_RIGHT:
        nextTabIndex = currentTabIndex + 1;
        break;

      case ARROW_LEFT: 
        nextTabIndex = currentTabIndex - 1;
        break;

      case HOME:
        nextTabIndex = 0;
        break;

      case END:
        nextTabIndex = tabs.length - 1;
        break;

      default:
          break;
    }

    if (nextTabIndex > tabs.length - 1) nextTabIndex = 0;
    if (nextTabIndex < 0) nextTabIndex = tabs.length - 1;

    const nextTabId = tabs[nextTabIndex].props.id;
    const $nextTab = document.getElementById(nextTabId);
    $nextTab.focus();
    $nextTab.click();
  }

  return (
    <div
      ref={wrapperRef}
      className="tabs"
    >
      <div
        role="tablist"
        className="tabs__tablist"
        style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}
        onKeyDown={keyboardNavigation}
        aria-label={title}
      >
        {tabs}
        <div
          aria-hidden
          className="tabs__tablist-highlight"
          ref={highlightRef}
        />
      </div>
      <div
        className="tabs__tabpanels"
        ref={tabpanelsRef}
      >
        <div
          ref={railsRef}
          className="tabs__tabpanels-rails"
          style={{
            gridTemplateColumns: `repeat(${tabs.length}, 1fr)`,
            width: `${tabs.length * 100}%`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  currentTab: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      props: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
      }).isRequired,
    }),
  ),
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Tabs;