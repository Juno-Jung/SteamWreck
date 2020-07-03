import React, { FunctionComponent  } from 'react';
import GameCardLarge from '../GameCardLarge/GameCardLarge';
import GameCardMedium from '../GameCardMedium/GameCardMedium';

type RecommendationListProps = {
};

interface Recommendation { // FIX ME - move this to an interface file, and import here.
  appid: number,
  name: string,
  description: string,
  background_image: string,
  rating: number,
  rating_reason: number,
  tags: string,
}

// Use an Interface (named Props) to define the props this component will take.
interface Props {
  recommendations: Array<Recommendation>
}

// FIX ME- we need a global spinner component & use below in "loading data"
const RecommendationList: FunctionComponent<Props> = (props) => {

  const firstRecGame = props.recommendations[0];
  const allOtherRecGames = props.recommendations.slice(1, props.recommendations.length);

  return (
    <div>
      {(!props.recommendations.length)
      ? <div>Loading data....</div>
      :
        <div>
          <div>
            <GameCardLarge recGame={firstRecGame}/>
          </div>
          <div className="others">Check these Games too!</div>
          <div>
            {allOtherRecGames.map( (game) => {
              return <GameCardMedium recGame={game}/>
            })}
          </div>
        </div>
      }
    </div>
  )
};

export default RecommendationList;
