import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import Login from './components/Login/Login'
import serverService from './services/ServerService'
import hash from "./hash";
import './App.css';

function App() {
  const [steamid,setSteamid]= useState('')

  useEffect(() => {
    let steam:any = hash
    console.log(hash)
    setSteamid(steam.steamid)

  }, [])

  return (
    <div className="App">
      steamWreck app here!
      {!steamid &&<Login></Login>}
    </div>
  );
}

export default App;