import React, { FunctionComponent } from 'react';

import Navbar from '../Navbar/Navbar';
import UserSummary from '../UserSummary/UserSummary';
import RecommendationList from '../RecommendationList/RecommendationList';


type MainProps = {
  //
};

const Main: FunctionComponent = () => {
    return (
      <div className="Main">
        <Navbar />
        <UserSummary />
        <RecommendationList />
      </div>
    )
};

export default Main;
