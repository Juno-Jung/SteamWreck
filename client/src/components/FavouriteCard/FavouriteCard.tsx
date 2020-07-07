import React, { FunctionComponent  } from 'react';
import Game from '../../Game';
import GameRating from '../GameRating';
import { Link } from 'react-router-dom';

interface Props {
  game: Game;
};

const FavouriteCard: FunctionComponent<Props> = (props) => {
  const linkPathAndContent = {
    pathname: `/game/${props.game.appid}`,
    // pass the game as state for the link
    state: props.game
  }

  return (
    <div className="favouriteGame">
      <Link to={linkPathAndContent}><h2 className="favouriteGame__name">{props.game.name}</h2></Link>

      <div className="favouriteGame__imageAndScore">
        <Link to={linkPathAndContent}><img className="favouriteGame__image" src={props.game.background_image} alt=""/></Link>
        <GameRating game={props.game}/>
        <div>Date added: TBC</div>
      </div>

    </div>
  )

};

export default FavouriteCard;
