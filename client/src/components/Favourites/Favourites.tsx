import React, { FunctionComponent  } from 'react';
import Game from '../../Game';
import FavouriteCard from '../FavouriteCard';

interface Props {
  //favs: [Game];
  favs: Array<Game>;
};

const Favourites: FunctionComponent<Props> = (props) => {
  return (
    <>
      <div className="favouriteslist">
      <h1 className="favouriteslist__title">Liked Wreckomendations</h1>
      <div className="favouriteslist__favs">
        {props.favs.map( fav => {
          return <FavouriteCard game={fav}/>
        })}
      </div>
      </div>
    </>
  )
};

export default Favourites;
