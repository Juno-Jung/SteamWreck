import React, { FunctionComponent  } from 'react';
import GameCardLarge from '../GameCardLarge/GameCardLarge';
import GameCardMedium from '../GameCardMedium/GameCardMedium';
import Recommendation from './../../Recommendation'

// Use an Interface (named Props) to define the props this component will take.
interface Props {
  recommendations: Array<Recommendation>;
  addRemoveFav: Function;
  dataFetched: boolean;
}

// FIX ME- we need a global spinner component & use below in "loading data"
const RecommendationList: FunctionComponent<Props> = (props) => {

  const firstRecGame = props.recommendations[0];
  const allOtherRecGames = props.recommendations.slice(1, props.recommendations.length);

  return (
    <div>
      {(!props.dataFetched)
      ? <div>Loading data....</div>
      :
        <>
          <div>
            <GameCardLarge recGame={firstRecGame} addRemoveFav={props.addRemoveFav}/>
          </div>
          <div>
            {allOtherRecGames.map( (game) => {
              return <GameCardMedium key={game.appid} recGame={game} addRemoveFav={props.addRemoveFav}/>
            })}
          </div>
        </>
      }
    </div>
  )
};

export default RecommendationList;
