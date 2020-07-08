import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import Logout from './components/Logout';
import UserProfile from './components/UserProfile';
import GameDetail from './components/GameDetail';
import About from './components/About';
import Favourites from './components/Favourites';
import Navbar from './components/Navbar';
import Sticky from "react-sticky-el";
import serverService from "./services/ServerService";
import Game from './Game';
import './App.scss';
export const FavGamesContext = createContext<Array<Game>>([]);

// Pat: Moved the Navbar here-although it causes the main to reload all data - to be fixed.
const navigation = {
  company: { name: "SteamWreck", to: "/" },
  links: [
    { name: "Login", to: "/login" },
    { name: "About", to: "/about" },
    { name: "FaveWreck", to: "/favourite" },
    { name: "WorstWreck", to: "/worst" },
    { name: "Logout", to: "/logout" },
  ],
};

function App() {
  const [isAuth,setIsAuth]=useState(false)
  const [favGames, setFavGames] = useState<Array<Game>>([]);

  useEffect(() => {
    if(isAuth){
      localStorage.setItem("auth","true");
    }
    if(localStorage.getItem("auth")){
      setIsAuth(true);
    }
  }, [isAuth])

  // Fetch User Fav Games
  useEffect( () => {
    // Get user id
    let steamid;
    if (localStorage.getItem("steamid")) {
      steamid = localStorage.getItem("steamid");
    }
    // console.log("app.tsx: The User id =", steamid);

    serverService.getFavouriteGames(steamid)
    .then( (data) => {
      setFavGames(data);
    })
  }, []);

  return (
    <FavGamesContext.Provider value={favGames}>
      <BrowserRouter>
        <Sticky>
          <Navbar
            steamid='' // steamid not known at this stage?
            isAuth={isAuth}
            company={navigation.company}
            links={navigation.links}
          />
        </Sticky>

        <Switch>
          <Route exact path='/' render={(props) => (
            <Main favGames={favGames} setFavGames={setFavGames} history={props.history} isAuth={isAuth} setIsAuth={setIsAuth}/>
          )}/>
          <Route path='/login' component={Login} />
          <Route exact path='/profile' component={UserProfile} />
          <Route path='/game/:gameId' component={GameDetail} />
          <Route exact path='/about' component={About} />
          <Route exact path='/favourite' component={Favourites} />

          <Route exact path='/logout' render={(props) => (
            <Logout  setIsAuth={setIsAuth}/>
          )}/>
        </Switch>
      </BrowserRouter>
    </FavGamesContext.Provider>

  );
}

export default App;
