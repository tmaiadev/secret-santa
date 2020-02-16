import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Switch, Route, useHistory } from 'react-router-dom';

import EventForm from '../event-form';
import Menu from '../menu';
import { styleAbsoluteStretch } from '../../styles';

const StyledShell = styled.div`
  ${ styleAbsoluteStretch }

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
            NO CONTENT
          </Route>
        </Switch>
      </StyledCell>
    </StyledShell>
  );
};

export default Dashboard;