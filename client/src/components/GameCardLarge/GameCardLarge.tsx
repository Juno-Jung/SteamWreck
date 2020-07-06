import React, { FunctionComponent  } from 'react';
import RecommendationReason from '../RecommendationReason';
import GameTags from '../GameTags';
import GameDescription from '../GameDescription';
import FavouritePicker from '../FavouritePicker';
import { Link } from 'react-router-dom';

import './GameCardLarge.scss';
import Game from '../../Game';

interface Props {
  // Top Recommended Game.
  recGame: Game;
  addRemoveFav: Function;
}

const GameCardLarge: FunctionComponent<Props> = (props) => {
  const linkContent = {
    pathname: `/game/${props.recGame.appid}`,
    // pass the game as state for the link
    state: props.recGame
  }
  return (
    <div>
      <Link to={linkContent}><h1 className="nameLarge">{props.recGame.name} </h1></Link>
      <div className ="allDetailsLarge">
        <div className="mainDetailsLarge">
          <img alt="gameImage" className="gameImg" src={`${props.recGame.background_image}`}>
          </img>

        </div>

        <div className ="subDetailsLarge">
          <div className="rating">Rating: <span className="ratingNumber">{`${(
            100 * props.recGame.rating
            ).toFixed(0)} / 100`}</span></div>
          <RecommendationReason reasoning={props.recGame.rating_reason}/>
          <GameDescription recGame={props.recGame}/>

          <GameTags tags={props.recGame.tags}/>
          <FavouritePicker recGame={props.recGame} addRemoveFav={props.addRemoveFav}/>
        </div>
      </div>
    </div>
  )
};

export default GameCardLarge;