import React, { FunctionComponent } from 'react';
import Game from '../../Game';

interface Props {
  game: Game;
};

const GameRating: FunctionComponent<Props> = (props) => {
  return (
    <>
      <div className="rating">Rating: <span className="ratingNumber">{`${(
        100 * props.game.rating
        ).toFixed(0)} / 100`}</span></div>
    </>
  )
};

export default GameRating;
