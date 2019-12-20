import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import reducers from './reducers';
import { setStore } from './API';

const store = createStore(reducers);
setStore(store);

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});