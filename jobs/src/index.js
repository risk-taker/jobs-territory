import React from 'react';
import './index.css';
import App from './App';
import ReactDom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
