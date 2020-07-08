import React, { FunctionComponent  } from 'react';
import RecommendationReason from './../RecommendationReason'
import GameTags from '../GameTags'
import GameDescription from '../GameDescription'
import FavouritePicker from '../FavouritePicker';

import './GameCardMedium.scss'
import Game from '../../Game'

interface Props {
  recGame: Game;
  addRemoveFav: Function;
}

const GameCardMedium: FunctionComponent<Props> = (props) => {
  return (
    <div>
      <h1 className="nameMedium">{props.recGame.name}</h1>
      <div className ="allDetailsMedium">
        <div className="mainDetailsMedium">
          <img alt="gameImage" className="gameImg" src={`${props.recGame.background_image}`}></img>
          <div className="favButtonMedium" >
            <FavouritePicker recGame={props.recGame} addRemoveFav={props.addRemoveFav}/>
          </div>
        </div>

        <div className ="subDetailsMedium">
          <div className="rating">Rating: <span className="ratingNumber">{`${(
            100 * props.recGame.rating
            ).toFixed(0)} / 100`}</span></div>
          <RecommendationReason reasoning={props.recGame.rating_reason}/>
          <GameDescription recGame={props.recGame}/>
          <GameTags tags={props.recGame.tags}/>
        </div>
      </div>

    </div>
  )
};


export default GameCardMedium;
