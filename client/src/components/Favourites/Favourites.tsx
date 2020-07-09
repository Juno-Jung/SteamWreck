import React, { FunctionComponent, useContext } from 'react';
import Game from '../../Game';
import FavouriteCard from '../FavouriteCard';
import {FavGamesContext} from '../../App';
import Spinner from '../Spinner';
import './Favourites.scss';

interface Props {
  favGames: Array<Game>;
  history: any;
};

const Favourites: FunctionComponent<Props> = (props) => {
  const favGames = useContext(FavGamesContext);

  return (
    <>
      {(!favGames.length)
      ?
      <div>Just loading...
          <Spinner />
      </div>
      :
      <>
        <div className="favouriteslist">
          <h2 className="favouriteslist__title">{`Favourite Wreckomendations (${favGames.length})`}</h2>
          <div className="favouriteslist__favs">
            {favGames.map( game => {
              return <FavouriteCard game={game}/>
            })}
          </div>
        </div>
      </>
      }
    </>
  )
};

export default Favourites;
