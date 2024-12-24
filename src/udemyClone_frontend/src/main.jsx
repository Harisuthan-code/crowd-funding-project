import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Principal } from '@dfinity/principal';

const CURRENT_USER_ID = Principal.fromText('2vxsx-fae');
export default CURRENT_USER_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
