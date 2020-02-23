
import React, { useState, useReducer } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';

import Dashboard from '../dashboard';
import Dialog from '../dialog';
import DialogContext, { ACTION_TYPES as DIALOG_ACTION_TYPES } from '../../helpers/dialogContext';
import Login from '../login';
import UserContext from '../../helpers/userContext';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../constants';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
  },
});

const dialogInitialState = {
  open: false,
  title: '',
  body: '',
  closeCallback: null,
  confirmButtonShow: true,
  confirmButtonText: 'OK',
  confirmButtonCallback: null,
  cancelButtonShow: true,
  cancelButtonText: 'OK',
  cancelButtonCallback: null,
};

const dialogReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case DIALOG_ACTION_TYPES.OPEN:
      return {
        ...state,
        closeCallback: null,
        confirmButtonShow: true,
        confirmButtonText: 'OK',
        confirmButtonCallback: null,
        cancelButtonShow: true,
        cancelButtonText: 'Cancel',
        cancelButtonCallback: null,
        ...payload,
        open: true,
      };

    case DIALOG_ACTION_TYPES.CLOSE:
      return {
        ...state,
        open: false
      };

    default:
      return state;
  };
};

const App = () => {
  const [user, setUser] = useState(null);
  const [dialog, dispatchDialog] = useReducer(dialogReducer, dialogInitialState);

  const alert = (title, body, closeCallback = null) => {
    dispatchDialog({
      type: DIALOG_ACTION_TYPES.OPEN,
      payload: {
        title,
        body,
        closeCallback,
        cancelButtonShow: false,
      }
    });
  };

  const confirm = (title, body, confirmButtonCallback) => {
    dispatchDialog({
      type: DIALOG_ACTION_TYPES.OPEN,
      payload: {
        title,
        body,
        confirmButtonCallback
      }
    });
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <DialogContext.Provider value={{ dialog, dispatchDialog, alert, confirm }}>
          <UserContext.Provider value={{ user, setUser }}>
            {user
              ? <Dashboard />
              : <Login />
            }
          </UserContext.Provider>
          <Dialog />
        </DialogContext.Provider>
      </ThemeProvider>
    </Router>
  );
};

export default App;