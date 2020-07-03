import React, { FunctionComponent  } from 'react';
import './GameCardLarge.scss'
import Game from './../../Game'
import Collapsible from 'react-collapsible';
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
          <div className="reason">Wreck Reasoning: <span className="reasonTxt">{props.recGame.rating_reason}</span></div>
          <Collapsible className="collapse" trigger="Description" >
          <div className="description">{htmlToText.fromString(props.recGame.description)}</div>
          </Collapsible>
          <div className="tags">{props.recGame.tags}</div>
        </div>
      </div>
    </div>
  )
};

export default GameCardLarge;