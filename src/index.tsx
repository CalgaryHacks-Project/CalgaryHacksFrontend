import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.css";
// import "src/resources/fonts/iransans-fonts/fonts.css";
// import "src/resources/my-icons-collection/font/flaticon.css";
// import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";

import Home from '../src/views/home/Home';


ReactDOM.render(
  <Router>
    <div>
      <Switch>
        
        <Route path="/home" component={Home} />
      </Switch>
      <ToastContainer />
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();