import React, { FunctionComponent  } from 'react';
import Game from '../../Game';
import GameRating from '../GameRating';
import { Link } from 'react-router-dom';
import './FavouriteCard.scss';

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
      <Link to={linkPathAndContent}><h3 className="favouriteGame__name text--hover">{props.game.name}</h3></Link>

      <div className="favouriteGame__imageAndScore">
        <Link to={linkPathAndContent}><img className="favouriteGame__image box--hover" src={props.game.background_image} alt=""/></Link>
        <div className="favouriteGame__ratingAndDate">
          <GameRating game={props.game}/>
          <div>Bookmarked: TBC</div>
        </div>
      </div>

    </div>
  )

};

export default FavouriteCard;
