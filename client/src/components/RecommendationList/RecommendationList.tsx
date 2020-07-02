import React, { FunctionComponent  } from 'react';
import GameCardLarge from '../GameCardLarge/GameCardLarge';
import GameCardMedium from '../GameCardMedium/GameCardMedium';

type RecommendationListProps = {

};

// Use an Interface (named Props) to define the props this component will take.

interface Props {
  recommendations: Array<any>
}


const RecommendationList: FunctionComponent<Props> = (props) => {
  console.log("RecommendationList:FunctionComponent -> recommendations", props.recommendations)

  return (
    <div>
      {(!props.recommendations.length)
      ? <div>Loading data</div>
      :
        <div>
          <GameCardLarge/>
          <GameCardMedium/>
        </div>
      }
    </div>
  )
};

export default RecommendationList;
