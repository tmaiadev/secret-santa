import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Fab from '@material-ui/core/Fab';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Header from '../header';

const NewEventFab = styled(Fab)`
  & svg {
    margin-right: 8px;
  }

  &.MuiFab-extended {
    bottom: 16px;
    position: absolute;
    right: 16px;
  }
`;

const Menu = () => {
  const history = useHistory();

  const onNewEventClick = () => history.push('/new');

  return (
    <>
      <Header title="Secret Santa" />
      <NewEventFab
        color="secondary"
        onClick={onNewEventClick}
        variant="extended"
      >
        <AddCircleIcon />
        New Event
      </NewEventFab>
    </>
  )
};

export default Menu;