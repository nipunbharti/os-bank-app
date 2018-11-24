import React from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import Home from './components/Home/Home';
import BankHome from './components/BankHome/BankHome';
import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/bankhome" component={BankHome} />
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
