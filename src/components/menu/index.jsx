import React, { useState, useEffect, useContext } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Fab from '@material-ui/core/Fab';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Header from '../header';
import EventLink from '../event-link';
import UserContext from '../../helpers/userContext';
import { db } from '../../helpers/firebase';

const NewEventFab = styled(Fab)`
  & svg {
    margin-right: 8px;
  }

  &.MuiFab-extended {
    bottom: 16px;
    position: fixed;
    right: 16px;

    @media (min-width: 768px) {
      right: unset;
      left: calc(320px - 16px);
      transform: translateX(-100%);
    }
  }
`;

const Menu = () => {
  const [events, setEvents] = useState([]);
  const { user } = useContext(UserContext);
  const history = useHistory();

  const onNewEventClick = () => history.push('/new');

  useEffect(() => {
    db
      .collection('events')
      .where('host.uid', '==', user.uid)
      .get()
      .then(querySnapshot => {
        const events = [];

        querySnapshot.forEach((doc) => {
          events.push({
            id: doc.id,
            ...doc.data()
          });
        });

        setEvents(events);
      })
      .catch(e => console.log(e));
  }, [user.uid]);

  return (
    <>
      <Header title="Secret Santa" />
      {events.map((props) => <EventLink key={props.id} {...props} />)}
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