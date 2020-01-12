const listeners = [];

const callListeners = () => listeners.forEach(listener => listener.callback(getRoute()));

export const getRoute = () => window
  .location
  .pathname
  .replace(/^\//, '');

export const redirect = url => {
  window.history.pushState(null, null, `/${url}`);
  callListeners();
};

export const subscribe = listener => {
  const id = (Math.random() * 1000000000).toString(32).split('.')[0];
  const route = {
    id,
    callback: listener,
    unsubscribe: () => listeners.splice(listeners.findIndex(l => l.id === id)),
  };
  listeners.push(route);
  callListeners();
};


window.onpopstate = callListeners;