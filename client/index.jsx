import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import {Provider} from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import reducer from './reducer/reducer';
import "./sass/styles.scss";

// middleware for redux (used for async operation)
import thunk from 'redux-thunk';

import App from './components/App.jsx';
import Dashboard from './components/Dashboard.jsx';

// Enabling redux extension on browser
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));


// You need to use HashRouter for Electron environment to use React-Router.
// The reasoning: BrowserRouter & Router is meant for request-based environments (web) whereas HashRouter is meant for file-based environments (electron).
const Root = () => (<Provider store={store}>
                      <HashRouter>
                        <Route path={'/'} exact component={Dashboard} />
                      </HashRouter>
                    </Provider>);

render(<Root />, document.getElementById('root'));