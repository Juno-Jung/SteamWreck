import React, { FunctionComponent  } from 'react';
import RecommendationReason from './../RecommendationReason'

import './GameCardMedium.scss'
import Game from './../../Game'
const htmlToText = require("html-to-text");

interface Props {
  recGame: Game
}

const GameCardMedium: FunctionComponent<Props> = (props) => {
  return (
    <div>
      <h1 className="nameMedium">{props.recGame.name}</h1>
      <div className ="allDetailsMedium">
        <div className="mainDetailsMedium">
          <img className="gameImg" src={`${props.recGame.background_image}`}></img>
        </div>

        <div className ="subDetailsMedium">
          <div className="rating">Rating: <span className="ratingNumber">{props.recGame.rating * 100}</span></div>
          <RecommendationReason reasoning={props.recGame.rating_reason}/>
          <div className="description">{htmlToText.fromString(props.recGame.description)}</div>
          <div className="tags">{props.recGame.tags.join('--')}</div>
        </div>
      </div>

    </div>
  )
};


export default GameCardMedium;
