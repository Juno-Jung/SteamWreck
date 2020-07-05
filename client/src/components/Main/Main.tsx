import React, { FunctionComponent, useEffect, useState, } from "react";
import Sticky from 'react-sticky-el';

import Navbar from "../Navbar/Navbar";
import UserSummary from "../UserSummary/UserSummary";
import RecommendationList from "../RecommendationList/RecommendationList";
import serverService from "../../services/ServerService";
import Welcome from "../Welcome/Welcome"
import hash from "../../hash";
import Recommendation from "../../Recommendation";
import Game from '../../Game';

type MainProps = {
  setIsAuth: any;
  isAuth: boolean;
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
  const [steamid, setSteamid] = useState("");
  const [username, setUsername] = useState("");
  const [avatarfull, setAvatarfull] = useState("");
  const [countrycode, setCountrycode] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [favs, setFavs] = useState<Array<number>>([]);

  useEffect(() => {
    let steam: any = hash;
    console.log(hash);
    setSteamid(steam.steamid);
      serverService.getUserInfo(steam.steamid).then((user) => {
        console.log(user);
        props.setIsAuth(true);
        if (user) {
          setUsername(user.personaname);
          setAvatarfull(user.avatarfull);
          setCountrycode(user.countrycode);
          console.log(`user =${user}`)


          console.log(`user favs =${user.favourites}`)
          console.log(`user[0] favs=${user.favourites}`)
          setFavs(user.favourites);
        }
      });

    serverService
      .getRecommendations(steam.steamid)
      .then((responseData) =>
          responseData && setRecommendations(responseData.recommendations.total)
      )
  }, []);

  useEffect(() => {
    // Map the favs onto their game object
    recommendations.forEach((rec: Recommendation) => {
      if (favs.includes(rec.appid)) {
        console.log(`APP() setting app= ${rec.appid} fav flag to true.`);
        rec.isFav = true
      }
      else {
        rec.isFav = false;
        console.log(`APP() setting app= ${rec.appid} fav flag to false.`);
      }
    })
  }, [recommendations]);

  const { company, links } = navigation;

  function addRemoveFav(recGame: Recommendation): void {


    // (ii) Update the favourites number array
    const appid: number = recGame.appid;
    // add game's appid to array (when isFav is false)
    if (!recGame.isFav) {
      console.log("Main() adding to favs arr; game=", appid);

      setFavs( currentFavs => {
        return [...currentFavs, appid];
      })

    } else {
      // remove
      console.log("Main() removing to favs arr; game=", appid);

      setFavs( currentFavs => {
        return currentFavs.filter( (ele) => { return ele !== appid })
      })
    }

    // (iii) Toggle the isFav flag on game:
    recGame.isFav = (recGame.isFav) ? false : true;

    // (i) Update the favs


  }

  useEffect(() => {
    console.log("Main() useEffect[favs] called, where favs =", favs);
    // Update user favourites in DB - only if steamid is set
    if (steamid) serverService.setUserFavourites(favs, steamid);
  }, [favs])


  // function updateFavs (favs: [number], appid: number) {
  //   serverService.setUserFavourites(favs, steamid);
  // }

  return (
    <div className="Main">
        <Sticky>
          <Navbar steamid={steamid} isAuth={props.isAuth} company={company} links={links} />
        </Sticky>

      {props.isAuth && (
        <UserSummary
          username={username}
          avatarfull={avatarfull}
          countrycode={countrycode}
        />
      )}
            {!props.isAuth && (
 <Welcome></Welcome>
      )}
      {props.isAuth && <RecommendationList recommendations={recommendations} addRemoveFav={addRemoveFav}/>}
    </div>
  );
};

export default Main;
