import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, FutureFlags } from "react-router-dom";
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);