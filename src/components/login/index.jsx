import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import UserContext from '../../helpers/userContext';
import { auth, googleAuthProvider } from '../../helpers/firebase';
import { PRIMARY_COLOR } from '../../constants';

const StyledWrapper = styled.div`
  align-items: center;
  background-color: ${ PRIMARY_COLOR };
  background-image: url('/wallpaper.png');
  background-position: center center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;

  & > * {
    margin-bottom: 16px;
  }
`;

const StyledLogo = styled.img`
  max-width: 160px;
`;

const StyledLinearProgress = styled(LinearProgress)`
  width: 120px;
`;

const Login = () => {
  const [loading, setLoading] = useState(true);
  const { setUser } = useContext(UserContext);

  const login = () => {
    setLoading(true);
    auth.signInWithPopup(googleAuthProvider);
  }

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setLoading(false);
      setUser(user)
    });
  }, [setUser]);

  return (
    <StyledWrapper>
      <StyledLogo
        alt="Secret Santa"
        src="/logo.png"
      />
      {
        loading
          ? <StyledLinearProgress color="secondary" />
          : (
            <Button
              color='secondary'
              onClick={login}
              variant='contained'
            >
              Sign In with Google
            </Button>
          )
      }
    </StyledWrapper>
  );
}

export default Login;