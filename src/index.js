import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import injectTapEventPlugin from "react-tap-event-plugin";

import "./index.css";
import Uwm from "./uwm/Uwm";
import { configureStore } from './store/store'
import registerServiceWorker from "./registerServiceWorker";

// import { data } from './demo/data';

const Store = configureStore();
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin({
    shouldRejectClick: function (lastTouchEventTimestamp, clickEventTimestamp) {
        return true;
    }
});

ReactDOM.render(
    <Provider store={Store}>
        <Uwm />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
