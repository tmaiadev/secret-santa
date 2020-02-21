import { createContext } from 'react'; 

export const ACTION_TYPES = {
  OPEN: 'OPEN',
  CLOSE: 'CLOSE'
};

export default createContext({
  dialog: null,
  dispatchDialog: null
});