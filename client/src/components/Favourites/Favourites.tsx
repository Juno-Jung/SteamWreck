import React, { FunctionComponent, useEffect } from 'react';
import Game from '../../Game';
import FavouriteCard from '../FavouriteCard';
import serverService from "../../services/ServerService";

interface Props {
  //favs: [Game];
  favs: Array<Game>;
};

/* TEMP FETCH the FAVs HERE - using hard coded steam-id */
let favs: [string];
let favGames: Array<Game> = [];
console.info('INFO: hi from Favourites.tsx.........');

const Favourites: FunctionComponent<Props> = (props) => {
  //Fetch User and Recommendations using a Promise All
  useEffect( () => {
    serverService.getUserInfo('76561198056384406')
    .then( (data) => {
      // Handle getUserInfo promise
      if (data.user) {
        favs = data.user.favourites;
      }
    })
    .then( ()=> {
      // fetch the fav games ...
      serverService.getGames([123,456,789])
      .then( (data) => {
        favGames = data;
      })
    })
  }, []);

  return (
    <>
      <div className="favouriteslist">
      <h1 className="favouriteslist__title">Liked Wreckomendations</h1>
      <div className="favouriteslist__favs">
        {favGames.map( fav => {
          return <FavouriteCard game={fav}/>
        })}
      </div>
      </div>
    </>
  )
};

export default Favourites;
