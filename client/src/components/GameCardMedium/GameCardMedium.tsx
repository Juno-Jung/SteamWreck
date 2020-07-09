import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import RecommendationReason from './../RecommendationReason'
import GameTags from '../GameTags'
import GameDescription from '../GameDescription'
import FavouritePicker from '../FavouritePicker';
import GameRating from '../GameRating';

import './GameCardMedium.scss'
import Game from '../../Game'

interface Props {
  recGame: Game;
  addRemoveFav: Function;
}

const GameCardMedium: FunctionComponent<Props> = (props) => {

  const linkContent = {
    pathname: `/game/${props.recGame.appid}`,
    // pass the game as state for the link
    state: props.recGame
  }

  return (
    <div>
      <Link to={linkContent}><h1 className="nameMedium text--hover">{props.recGame.name} </h1></Link>
      <div className ="allDetailsMedium">
        <div className="mainDetailsMedium">
          <img alt="gameImage" className="gameImg box--hover" src={`${props.recGame.background_image}`}></img>
          <div className="favButtonMedium" title="Add To Favourite">
            <FavouritePicker recGame={props.recGame} addRemoveFav={props.addRemoveFav}/>
          </div>
        </div>

        <div className ="subDetailsMedium">
          <GameRating game={props.recGame}/>
          <RecommendationReason reasoning={props.recGame.rating_reason}/>
          <GameDescription recGame={props.recGame}/>
          <GameTags tags={props.recGame.tags}/>
        </div>
      </div>

    </div>
  )
};


export default GameCardMedium;
