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
import Home from './components/Home/Home';
import RoomHome from './components/RoomHome/RoomHome';
import TestSocket from './components/TestSocket/TestSocket';


import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route  path="/roomhome" component={RoomHome}/>
        <Route  path="/testsocket" component={TestSocket}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
