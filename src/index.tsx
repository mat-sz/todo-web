import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import createStore from './store';

const store = createStore();

store.subscribe(() => {
    const settings = store.getState().settings;
    localStorage.setItem('settings', JSON.stringify(settings));
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));