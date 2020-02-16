
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';

import Dashboard from '../dashboard';
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

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ user, setUser }}>
          {user
            ? <Dashboard />
            : <Login />
          }
        </UserContext.Provider>
      </ThemeProvider>
    </Router>
  );
};

export default App;