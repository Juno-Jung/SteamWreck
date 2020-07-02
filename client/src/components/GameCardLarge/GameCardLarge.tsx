import React, { FunctionComponent  } from 'react';
import './GameCardLarge.scss'

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
  tags: string,
}

interface Props {
  // Top Recommended Game.
  recGame: Game
}

// FIX ME- handling if recGame is unDefined

const GameCardLarge: FunctionComponent<Props> = (props) => {
  return (
    <div>
      <h1 className="nameLarge">{props.recGame.name}</h1>
      <div className ="allDetailsLarge">
        <div className="mainDetailsLarge">
          <img className="gameImg" src={`${props.recGame.background_image}`}></img>
        </div>

        <div className ="subDetailsLarge">
          <div className="rating">Rating: <span className="ratingNumber">{props.recGame.rating * 100}</span></div>
          <div className="reason">Wreck Reasoning: <span className="reasonTxt">{props.recGame.rating_reason}</span></div>
          <div className="purchased">X Days since purchase</div>
          <div className="description">{props.recGame.description}</div>
          <div className="tags">{props.recGame.tags}</div>
        </div>
      </div>
    </div>
  )
};

export default GameCardLarge;