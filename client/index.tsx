import * as React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import reducer from './reducer/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

// middleware for redux (used for async operation)
import thunk from 'redux-thunk';

import App from './components/App';

import "./sass/styles.scss";

// Enabling redux extension on browser
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

// You need to use HashRouter for Electron environment to use React-Router.
// The reasoning: BrowserRouter & Router is meant for request-based environments (web) whereas HashRouter is meant for file-based environments (electron).
const Root = () => (<Provider store={store}>
                      <HashRouter>
                        <Route path={'/'} exact component={App} />
                      </HashRouter>
                    </Provider>);

render(<Root />, document.getElementById('root'));
