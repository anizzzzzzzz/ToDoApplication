import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Router from "./routes/Router";
import {Provider} from "react-redux";
import {persistor, store} from "./store/index";
import {PersistGate} from "redux-persist/lib/integration/react";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router/>
        </PersistGate>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
