import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Navigate } from 'react-router-dom';
import '@shopify/polaris/build/esm/styles.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { Provider } from "react-redux";
import store from './store'

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
    , document.getElementById('root'));
reportWebVitals();
