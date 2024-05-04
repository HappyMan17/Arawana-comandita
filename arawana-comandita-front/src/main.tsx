import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter as BrowserRouter } from 'react-router-dom';
import { MainRouter } from './router';
import { Provider } from 'react-redux';
import { store } from './redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MainRouter />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);

