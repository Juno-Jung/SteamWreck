import React, { FunctionComponent  } from 'react';
import './GameCardMedium.scss'
import Game from './../../Game'
import Collapsible from 'react-collapsible';

type GameCardMediumProps = {
  //
};


interface Props {
  recGame: Game
}

const GameCardMedium: FunctionComponent<Props> = (props) => {
  return (
    <div>
      <Collapsible trigger=
     { <h1 className="nameMedium">{props.recGame.name}</h1>}>

        <div className="mainDetailsMedium">
      <div className ="allDetailsMedium">
          <img className="gameImg" src={`${props.recGame.background_image}`}></img>
        </div>

        <div className ="subDetailsMedium">
          <div className="rating">Rating: <span className="ratingNumber">{props.recGame.rating * 100}</span></div>
          <div className="reason">Wreck Reasoning: <span className="reasonTxt">{props.recGame.rating_reason}</span></div>
          <div className="purchased">X Days since purchase</div>
          <div className="description">{props.recGame.description}</div>
          <div className="tags">{props.recGame.tags}</div>
        </div>
      </div>
      </Collapsible>


    </div>
  )
};


export default GameCardMedium;
