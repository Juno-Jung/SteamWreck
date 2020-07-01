import React, { FunctionComponent ,useEffect, useState} from 'react';

import Navbar from '../Navbar/Navbar';
import UserSummary from '../UserSummary/UserSummary';
import RecommendationList from '../RecommendationList/RecommendationList';
import serverService from '../../services/ServerService'
import hash from '../../hash'
type MainProps = {
  //
};

const navigation = {
  company: { name: "SteamWreck", to: "/" },
  links: [
    { name: "Login", to: "/login" },
    { name: "About", to: "/about" },
    { name: "FaveWreck", to: "/favourite" },
    { name: "WorstWreck", to: "/worst" },
    { name: "Logout", to: "/logout" },
  ]
};

const Main: FunctionComponent = () => {
  const [userInfo,setUserInfo]=useState(String);
  useEffect(() => {
   
  }, [])

    const { company, links } = navigation;
    return (
      <div className="Main">
        <Navbar company={company} links={links} />
        <UserSummary />
        <RecommendationList />
      </div>
    )
};

export default Main;
