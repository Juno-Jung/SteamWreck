import React, {} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './components/Main';
import Login from './components/Login';
import Logout from './components/Logout';
import UserProfile from './components/UserProfile';
import GameDetail from './components/GameDetail';
import About from './components/About';

function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profile' component={UserProfile} />
        <Route path='/game/:gameId' component={GameDetail} />
        <Route exact path='/about' component={About} />
        <Route exact path='/logout' component={Logout} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
