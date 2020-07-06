import React, { useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './components/Main';
import Login from './components/Login';
import Logout from './components/Logout';
import UserProfile from './components/UserProfile';
import GameDetail from './components/GameDetail';
import About from './components/About';
import './App.scss';

function App() {
  const [isAuth,setIsAuth]=useState(false)
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={(props) => (
          <Main history={props.history} isAuth={isAuth} setIsAuth={setIsAuth}/>
        )}/>
        <Route path='/login' component={Login} />
        <Route exact path='/profile' component={UserProfile} />
        <Route path='/game/:gameId' component={GameDetail} />
        <Route exact path='/about' component={About} />
        <Route exact path='/logout' render={(props) => (
          <Logout  setIsAuth={setIsAuth}/>
        )}/>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
