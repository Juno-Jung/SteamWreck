import React, { FunctionComponent, useEffect, useState } from "react";
import Sticky from 'react-sticky-el';

import Navbar from "../Navbar/Navbar";
import UserSummary from "../UserSummary/UserSummary";
import RecommendationList from "../RecommendationList/RecommendationList";
import serverService from "../../services/ServerService";
import Welcome from "../Welcome/Welcome"
import hash from "../../hash";
import Recommendation from "../../Recommendation";

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
        props.setIsAuth(true);
        if(user[0]){
        setUsername(user[0].personaname);
        setAvatarfull(user[0].avatarfull);
        setCountrycode(user[0].countrycode);
          setFavs(user.favourites);
        }
      });

    serverService
      .getRecommendations(steam.steamid)
      .then(
        (responseData) =>
          responseData && setRecommendations(responseData.recommendations.total)
      ).then(
        // Map the favs onto their game object
        () => recommendations.forEach((rec: Recommendation) => {
          if (favs.includes(rec.appid)) rec.isFav = true;
          else rec.isFav = false;
        })
      );
  }, []);

  useEffect(() => {
    console.log(recommendations);
  }, [recommendations]);

  const { company, links } = navigation;

  function addRemoveFav(addRemoveFlag: boolean, appId: number): void {
    // Add the passed appId (string) into array, or remove
    console.log('main.tsx() addRemoveFav(): will..');
    // add
    if (addRemoveFlag) {
      console.log('add:', appId);
      setFavs( currentFavs => {
        return [...currentFavs, appId];
      })
    } else {
      // remove
      console.log('remove:', appId);
      setFavs( currentFavs => {
        return currentFavs.filter( (ele) => { return ele !== appId })
      })
    }
  }

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
