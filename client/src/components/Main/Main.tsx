import React, { FunctionComponent, useEffect, useState } from "react";

import Navbar from "../Navbar/Navbar";
import UserSummary from "../UserSummary/UserSummary";
import RecommendationList from "../RecommendationList/RecommendationList";
import serverService from "../../services/ServerService";
import hash from "../../hash";
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
        }
      });

    serverService
      .getRecommendations(steam.steamid)
      .then(
        (responseData) =>
          responseData && setRecommendations(responseData.recommendations.total)
      );
  }, []);

  useEffect(() => {
    console.log(recommendations);
  }, [recommendations]);

  const { company, links } = navigation;
  return (
    <div className="Main">
      <Navbar steamid={steamid} isAuth={props.isAuth} company={company} links={links} />
      {props.isAuth && (
        <UserSummary
          username={username}
          avatarfull={avatarfull}
          countrycode={countrycode}
        />
      )}
      {props.isAuth && <RecommendationList recommendations={recommendations} />}
    </div>
  );
};

export default Main;
