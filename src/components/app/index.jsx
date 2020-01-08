import React, { useEffect, useState } from 'react';
import Intro from '../intro';
import Dashboard from '../dashboard';
import './styles.css';

const App = () => {
  const [showFocusRing, setShowFocusRing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const enableFocusRing = ({ key }) => {
      if (key !== 'Tab') return;
      setShowFocusRing(true);
    };

    const disableFocusRing = () => setShowFocusRing(false);

    document.addEventListener('keydown', enableFocusRing);
    document.addEventListener('touchstart', disableFocusRing);
    document.addEventListener('mousemove', disableFocusRing);
    
    return () => {
      document.removeEventListener('keydown', enableFocusRing);
      document.removeEventListener('touchstart', disableFocusRing);
      document.removeEventListener('mousemove', disableFocusRing);
    };
  }, [showFocusRing]);
  
  const onLogin = (user) => {
    setUser(user);
  };

  return (
    <div className={ `app ${ showFocusRing === false && 'app--no-focus-ring' }` }>
      {user
        ? <Dashboard user={user} />
        : <Intro onLogin={onLogin} /> }
    </div>
  );
};

export default App;