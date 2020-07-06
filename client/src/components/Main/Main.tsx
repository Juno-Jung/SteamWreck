import React, { FunctionComponent, useEffect, useState } from "react";
import Sticky from "react-sticky-el";
import {Redirect} from 'react-router-dom'

import Navbar from "../Navbar/Navbar";
import UserSummary from "../UserSummary/UserSummary";
import RecommendationList from "../RecommendationList/RecommendationList";
import serverService from "../../services/ServerService";
import Welcome from "../Welcome/Welcome";
import hash from "../../hash";
import params from "../../params";

import Recommendation from "../../Recommendation";
import Game from "../../Game";

type MainProps = {
  setIsAuth: any;
  isAuth: boolean;
  history: any
};

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

const Main: FunctionComponent<MainProps> = (props) => {
  const [testid,setTestid] = useState("")
  const [steamid, setSteamid] = useState("");
  const [username, setUsername] = useState("");
  const [avatarfull, setAvatarfull] = useState("");
  const [countrycode, setCountrycode] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [favs, setFavs] = useState<Array<number>>([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("steamid")) {props.history.push('#steamid='+localStorage.getItem("steamid"))}
    let steam: any = params();
    setSteamid(steam.steamid); 

    // Fetch User and Recommendations using a Promise All:: set dataFetched to true at the end.
    Promise.all([serverService.getUserInfo(steam.steamid), serverService.getRecommendations(steam.steamid)]).then( (values) => {
      // Handle getUserInfo promise
      const user = values[0];

      if(steam.steamid) {
        localStorage.setItem("steamid", steam.steamid)
        props.setIsAuth(true); 
      }   
      
      if (user) {
        setUsername(user.personaname);
        setAvatarfull(user.avatarfull);
        setCountrycode(user.countrycode);
        setFavs(user.favourites);
      }
      // Handle getRecommendations promise
      const userData = values[1];
      if (userData) setRecommendations(userData.recommendations.total);
      setDataFetched(true);
    }).catch( err => { console.error(`ERROR Main.txs:: useEffect() PromiseAll fetching data has error = ${err}`); });
  }, []);

  useEffect(() => {
    // Map the favs onto their game object
    recommendations.forEach((rec: Recommendation) => {
      if (favs && favs.includes(rec.appid)) rec.isFav = true
      else rec.isFav = false;
    });
  }, [recommendations]);

  const { company, links } = navigation;

  function addRemoveFav(recGame: Recommendation): void {
    // (i) Update the favourites number array
    const appid: number = recGame.appid;
    // add game's appid to array (when isFav is false)
    if (!recGame.isFav) {
      if (!favs)
        // No favs - initialise the first fav into the array
        setFavs([appid])
      else
        setFavs( currentFavs => {
          return [...currentFavs, appid];
        })
    } else {
      // remove
      setFavs((currentFavs) => {
        return currentFavs.filter((ele) => {
          return ele !== appid;
        });
      });
    }

    // (ii) Toggle the isFav flag on game:
    recGame.isFav = (recGame.isFav) ? false : true;

    // (iii) Update the favs [This has moved to a useEffect]
  }

  useEffect(() => {
    // Update user favourites in DB - only if steamid is set
    if (steamid) serverService.setUserFavourites(favs, steamid);
  }, [favs])

  return (
    <div className="Main">
      <Sticky>
        <Navbar
          steamid={steamid}
          isAuth={props.isAuth}
          company={company}
          links={links}
        />
      </Sticky>

      {props.isAuth && (
        <UserSummary
          username={username}
          avatarfull={avatarfull}
          countrycode={countrycode}
        />
      )}

      {!props.isAuth && <Welcome></Welcome>}
      {props.isAuth && (
        <RecommendationList
          recommendations={recommendations}
          addRemoveFav={addRemoveFav}
        />
      )}
    </div>
  );
};

export default Main;
