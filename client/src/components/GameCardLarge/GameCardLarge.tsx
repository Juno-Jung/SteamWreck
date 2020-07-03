import React, { FunctionComponent  } from 'react';
import './GameCardLarge.scss'
const htmlToText = require('html-to-text');

type GameCardLargeProps = {
  //
};

interface Game {
  appid: number,
  name: string,
  description: string,
  background_image: string,
  rating: number,
  rating_reason: number,
}

interface Props {
  // Top Recommended Game.
  recGame: Game
}

// FIX ME- handling if recGame is unDefined

const GameCardLarge: FunctionComponent<Props> = (props) => {
  return (
    <div>
      <h1 className="name">{props.recGame.name}</h1>
      <div className ="allDetails">
        <div className="mainDetails">
          <img className="gameImg" src={`${props.recGame.background_image}`}></img>
          <h4 className="purchased">X Days since purchase</h4>
        </div>

        <div className ="subDetails">
          <div className="rating">Rating: <span className="ratingNumber">{props.recGame.rating * 100}</span></div>
          <div className="reason">Wreak Reasoning: <span className="reasonTxt">{props.recGame.rating_reason}</span></div>
          <div className="description">{htmlToText.fromString(props.recGame.description)}</div>
        </div>
      </div>
    </div>
  )
};

export default GameCardLarge;