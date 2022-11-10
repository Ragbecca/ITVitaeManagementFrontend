import React from 'react';
import { createRoot } from 'react-dom/client';
import './App.scss';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './containers/App';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

const store = configureStore();

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  </Provider>,
);
