import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import Login from './components/Login/Login'
import serverService from './services/ServerService'
import hash from "./hash";
import './App.css';
import Navbar from './components/Navbar';
import RecommendationList from './components/RecommendationList';
import UserSummary from './components/UserSummary';

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
    <div className="App">
      steamWreck app here!
      {!steamid &&<Login />}
      {info}
      <Navbar />
      <UserSummary />
      <RecommendationList />
    </div>
  );
}

export default App;