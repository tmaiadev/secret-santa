import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Switch, Route, useHistory } from 'react-router-dom';

import EventForm from '../event-form';
import Menu from '../menu';
import { PRIMARY_COLOR } from '../../constants';
import { styleAbsoluteStretch } from '../../styles';

const StyledShell = styled.div`
  ${ styleAbsoluteStretch }
  background-color: #F5F5F5;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 320px auto;
  }
`;

const StyledCell = styled.div`
  -webkit-overflow-scrolling: touch;
  display: ${({ active }) => active ? 'block' : 'none'};
  height: 100%;
  overflow-y: auto;
  position: relative;

  @media (min-width: 768px) {
    display: block;

    ${({ borderLeft }) => borderLeft
      && css`
        border-left: solid thin rgba(0, 0, 0, .3);
      `
    }
  }
`;

const StyledNoContent = styled.div`
  align-items: center;
  background-color: ${ PRIMARY_COLOR };
  background-image: url('/wallpaper.png');
  background-position: center center;
  box-shadow: inset 1px -3px 3px rgb(255,255,255);
  display: flex;
  filter: opacity(.6) grayscale(1) invert(1);
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Dashboard = () => {
  const [main, setMain] = useState(false);
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    setMain(pathname.replace(/^\//, ''));
  }, [pathname]);

  return (
    <StyledShell>
      <StyledCell active={!main}>
        <Menu />
      </StyledCell>
      <StyledCell active={main} borderLeft>
        <Switch>
          <Route path="/new">
            <EventForm />
          </Route>
          <Route path="/edit/:id">
            EDIT
          </Route>
          <Route path="/:id">
            EVENT
          </Route>
          <Route path="/">
            <StyledNoContent />
          </Route>
        </Switch>
      </StyledCell>
    </StyledShell>
  );
};

export default Dashboard;