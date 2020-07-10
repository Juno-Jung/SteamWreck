import React, { FunctionComponent  } from 'react';
import Game from '../../Game';
import GameRating from '../GameRating';
import RecommendationReason from '../RecommendationReason';
import { Link } from 'react-router-dom';
import './FavouriteCard.scss';
import moment from 'moment';

interface Props {
  game: Game;
};

const FavouriteCard: FunctionComponent<Props> = (props) => {
  const linkPathAndContent = {
    pathname: `/game/${props.game.appid}`,
    // pass the game as state for the link
    state: props.game
  }

  const favDate = props.game.dateAdded;
  const longDate = moment(favDate).format('MMMM Do YYYY, h:mm:ss a');
  const dayOfMonth = moment(favDate).format("Do");
  const month = moment(favDate).format("MMM");
  const since = moment(favDate).startOf('hour').fromNow();

  return (
    <div className="favouriteGame">
      <Link to={linkPathAndContent}><h3 className="favouriteGame__name text--hover">{props.game.name}</h3></Link>

      <div className="favouriteGame__imageAndScore">
        <Link to={linkPathAndContent}><img className="favouriteGame__image box--hover" src={props.game.background_image} alt=""/></Link>
        <div className="favouriteGame__ratingAndDate">
          <GameRating game={props.game}/>
          {/* <div className="favouriteGame__ratingAndDate__date">{`Added: ${longDate}`}</div> */}
        </div>
        <div className="favouriteGame__recReason">
          <RecommendationReason reasoning={props.game.rating_reason}/>
        </div>
      </div>

    </div>
  )

};

export default FavouriteCard;
