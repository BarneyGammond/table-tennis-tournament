import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import initial from './Data/initial'
import reducer from './Data/reducer'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './fonts/Quicksand-Medium.ttf'
import './fonts/Quicksand-Regular.ttf'
import './fonts/Signika-Regular.ttf'
import './fonts/Signika-SemiBold.ttf'


const store = createStore(
  reducer, 
  initial,
  window.__REDUX_DEVTOOLS_EXTENSION__ 
    && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
