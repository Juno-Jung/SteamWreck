import React, { FunctionComponent  } from 'react';
import './GameCardLarge.scss'
import Game from './../../Game'
const htmlToText = require("html-to-text");

type GameCardLargeProps = {
  //
};


interface Props {
  // Top Recommended Game.
  recGame: Game;
}

const GameCardLarge: FunctionComponent<Props> = (props) => {
  return (
    <div>
      {props.recGame && (
        <div>
          <h1 className="name">{props.recGame.name}</h1>
          <div className="allDetails">
            <div className="mainDetails">
              <img
                className="gameImg"
                src={`${props.recGame.background_image}`}
              ></img>
              {/*           <h4 className="purchased">X Days since purchase</h4> */}
            </div>
          </div>

          <div className="subDetails">
            <div className="rating">
              Rating:{" "}
              <span className="ratingNumber">{`${(
                100 * props.recGame.rating
              ).toFixed(0)} / 100`}</span>
            </div>
            <div className="reason">
              Wreck Reasoning:{" "}
              <span className="reasonTxt">{props.recGame.rating_reason}</span>
            </div>
            <div className="description">
              {htmlToText.fromString(props.recGame.description)}
            </div>
            <div className="tags">{props.recGame.tags}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCardLarge;
