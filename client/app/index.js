import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';
import { Provider } from 'react-redux';
import getStore from './store/store';

const store = getStore();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
