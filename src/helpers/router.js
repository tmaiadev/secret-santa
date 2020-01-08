const listeners = [];

export const redirect = url => {
  window.history.pushState(null, null, url);

  const route = window
    .location
    .pathname
    .replace(/^\//, '');

  listeners
    .forEach(listener => listener.callback(route));
};

export const subscribe = listener => {
  const id = (Math.random() * 1000000000).toString(32).split('.')[0];
  listeners.push({
    id,
    callback: listener,
    unsubscribe: () => listeners.splice(listeners.findIndex(l => l.id === id)),
  });
};