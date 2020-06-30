import React, { FunctionComponent } from 'react';

import Navbar from '../Navbar/Navbar';
import UserSummary from '../UserSummary/UserSummary';
import RecommendationList from '../RecommendationList/RecommendationList';

type MainProps = {
  //
};

const navigation = {
  company: { name: "SteamWreck", to: "/" },
  links: [
    { name: "About", to: "/about" },
    { name: "FaveWreck", to: "/favourite" },
    { name: "WorstWreck", to: "/worst" },
    { name: "Logout", to: "/logout" },
  ]
};

const Main: FunctionComponent = () => {
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
