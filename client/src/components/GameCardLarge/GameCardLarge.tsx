import React, { FunctionComponent  } from 'react';
import RecommendationReason from '../RecommendationReason';
import GameTags from '../GameTags';
import GameDescription from '../GameDescription';
import FavouritePicker from '../FavouritePicker';
import GameRating from '../GameRating';

import { Link } from 'react-router-dom';

import './GameCardLarge.scss';
import Game from '../../Game';

interface Props {
  // Top Recommended Game.
  recGame: Game;
  addRemoveFav: Function;
}

const GameCardLarge: FunctionComponent<Props> = (props) => {
  const linkPathAndContent = {
    pathname: `/game/${props.recGame.appid}`,
    // pass the game as state for the link
    state: props.recGame
  }
  return (
    <div>
      <Link to={linkPathAndContent}><h1 className="nameLarge text--hover">{props.recGame.name} </h1></Link>
      <div className ="allDetailsLarge">
        <div className="mainDetailsLarge">
          <img className="gameImg box--hover" alt="gameImage" src={`${props.recGame.background_image}`}></img>
            <div className="favButtonLarge" >
              <FavouritePicker recGame={props.recGame} addRemoveFav={props.addRemoveFav}/>
            </div>
        </div>

        <div className ="subDetailsLarge">
          <GameRating game={props.recGame}/>
          <RecommendationReason reasoning={props.recGame.rating_reason}/>
          <GameDescription recGame={props.recGame}/>

          <GameTags tags={props.recGame.tags}/>
        </div>
      </div>
    </div>
  )
};

export default GameCardLarge;
