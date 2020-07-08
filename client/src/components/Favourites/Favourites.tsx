import React, { FunctionComponent, useContext } from 'react';
import Game from '../../Game';
import FavouriteCard from '../FavouriteCard';
import {FavGamesContext} from '../../App';

interface Props {
  favGames: Array<Game>;
  history: any;
};

const Favourites: FunctionComponent<Props> = (props) => {
  const favGames = useContext(FavGamesContext);

  return (
    <>
      <div className="favouriteslist">
      <h1 className="favouriteslist__title">Liked Wreckomendations</h1>
      <div className="favouriteslist__favs">
        {favGames.map( game => {
          return <FavouriteCard game={game}/>
        })}
      </div>
      </div>
    </>
  )
};

export default Favourites;
