import React, { FunctionComponent  } from 'react';
import GameCardLarge from '../GameCardLarge/GameCardLarge';
import GameCardMedium from '../GameCardMedium/GameCardMedium';

type RecommendationListProps = {
  //
};

const RecommendationList: FunctionComponent = () => {
  return (
    <>
      <GameCardLarge/>
      <GameCardMedium/>
    </>

  )
};

export default RecommendationList;
