import React, { FunctionComponent  } from 'react';
import RecommendationReason from '../RecommendationReason'
import GameTags from '../GameTags'

import './GameCardLarge.scss'
import Game from './../../Game'
const htmlToText = require("html-to-text");

interface Props {
  // Top Recommended Game.
  recGame: Game
}

const GameCardLarge: FunctionComponent<Props> = (props) => {
  return (
    <div>
      <h1 className="nameLarge">{props.recGame.name}</h1>
      <div className ="allDetailsLarge">
        <div className="mainDetailsLarge">
          <img className="gameImg" src={`${props.recGame.background_image}`}></img>
        </div>

        <div className ="subDetailsLarge">
          <div className="rating">Rating: <span className="ratingNumber">{`${(
                100 * props.recGame.rating
              ).toFixed(0)} / 100`}</span></div>
          <RecommendationReason reasoning={props.recGame.rating_reason}/>
          <div className="description">{htmlToText.fromString(props.recGame.description)}</div>
          <GameTags tags={props.recGame.tags}/>
        </div>
      </div>
    </div>
  )
};

export default GameCardLarge;