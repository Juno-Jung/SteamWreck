import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './components/Main';
import Login from './components/Login';
import Logout from './components/Logout';
import UserProfile from './components/UserProfile';
import GameDetail from './components/GameDetail';
import About from './components/About';
import Navbar from './components/Navbar';
import RecommendationList from './components/RecommendationList';
import UserSummary from './components/UserSummary';

import serverService from './services/ServerService'
import hash from "./hash";

import './App.css';


function App() {
  const [steamid,setSteamid]= useState('')
  const [info,setInfo]= useState([])
  useEffect(() => {
    let steam:any = hash
    console.log(hash)
    setSteamid(steam.steamid)
    setInfo(serverService.getUserInfo(steam.steamid));
  }, [])
 
  return (
/*
    <div className="App">
      steamWreck app here!
      {!steamid &&<Login />}
      {info}
      <Navbar />
      <UserSummary />
      <RecommendationList />
    </div>
*/

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
