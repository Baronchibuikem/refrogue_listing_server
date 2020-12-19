import React from 'react';
import ReactDOM from 'react-dom';
import { Listings } from "./sections"
// import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Listings title="TinyHouse Listings"/>
  </React.StrictMode>,
  document.getElementById('root')
);