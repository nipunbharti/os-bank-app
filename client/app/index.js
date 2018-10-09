import React from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import SignUp from './components/SignUp/SignUp';


import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={SignUp}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
