import React, { FunctionComponent } from 'react';
import Game from '../../../types/Game'
const htmlToText = require("html-to-text");

interface Props {
  recGame: Game;
}

const GameDescription: FunctionComponent<Props> = (props) => {
  return (
    <div className="description">{htmlToText.fromString(props.recGame.description_short)}</div>
  )
};


export default GameDescription;
