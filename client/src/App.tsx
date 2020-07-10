import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import Logout from './components/Logout';
import GameDetail from './components/GameDetail';
import About from './components/About';
import Favourites from './components/Favourites';
import Navbar from './components/Navbar';
import Sticky from "react-sticky-el";
import serverService from "./services/ServerService";
import Game from '../types/Game';
import './App.scss';
export const FavGamesContext = createContext<Array<Game>>([]);
let dataCollected = false;

// Pat: Moved the Navbar here-although it causes the main to reload all data - to be fixed.
const navigation = {
  company: { name: "", to: "/" },
  links: [
    { name: "Login", to: "/login" },
    { name: "About", to: "/about" },
    { name: "FaveWreck", to: "/favourite" },
    { name: "WorstWreck", to: "/worst" },
    { name: "Logout", to: "/logout" },
  ],
};

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [favGames, setFavGames] = useState<Array<Game>>([]);

  useEffect(() => {
    if (isAuth) {
      localStorage.setItem("auth", "true");
    }
    if (localStorage.getItem("auth")) {
      setIsAuth(true);
    }
  }, [isAuth])

  // Fetch User Fav Games
  useEffect(() => {
    // Get user id
    let steamid;
    if (localStorage.getItem("steamid")) {
      steamid = localStorage.getItem("steamid");
    }

    serverService.getFavouriteGames(steamid)
      .then((data) => {
        // loop over first array - merge objects from 1st & 2nd arrays and push into new array.
        let gameArr = [];
        for (let i = 0; i < data[0].length; i++) {
          const obj1 = data[0][i];
          const obj2 = data[1][i];
          gameArr.push({ ...obj1, ...obj2 })
        }
        setFavGames(gameArr);
      })
  }, []);

  return (
    <FavGamesContext.Provider value={favGames}>
      <BrowserRouter>
        {(isAuth) &&
          <Sticky>
            <Navbar
              steamid='' // steamid not known at this stage?
              isAuth={isAuth}
              company={navigation.company}
              links={navigation.links}
            />
          </Sticky>
        }
        <Switch>
          <Route exact path='/' render={(props) => (
            <Main favGames={favGames} setFavGames={setFavGames} history={props.history} isAuth={isAuth} setIsAuth={setIsAuth} />
          )} />
          <Route path='/login' component={Login} />
          <Route path='/game/:gameId' component={GameDetail} />
          <Route exact path='/about' component={About} />
          <Route exact path='/favourite' component={Favourites} />

          <Route exact path='/logout' render={(props) => (
            <Logout setIsAuth={setIsAuth} />
          )} />
        </Switch>
      </BrowserRouter>
    </FavGamesContext.Provider>

  );
}

export default App;
