import React, { FunctionComponent  } from 'react';
import Gallereact from 'gallereact';
import Game from '../../Game';
import './GameDetail.scss'
const STEAM_STORE_BASE_URL = 'https://store.steampowered.com/app';

interface Props {
  location: any // not sure what type this is??
};

const GameDetail: FunctionComponent<any> = (props) => {
  const game: Game = props.location.state;

  const screenshots = game.screenshots.map( screenshot => {
    // add an image prop to each screenshot object.
    return {...screenshot, image : screenshot.path_full}
  });

  const steamGameLink = `${STEAM_STORE_BASE_URL}/${game.appid}`;
  const htmlDesc = { __html: game.description_steam};

  return (
    <div className="gameDetail">
      <h1 className="gameDetail__name">{game.name}</h1>
      <div className="gameDetail__screenshots">
        <Gallereact images={screenshots} displayPreview={true} />
      </div>

      <div className="gameDetail__longDescription" dangerouslySetInnerHTML={htmlDesc}></div>
      <a className="gameDetail__metricCriticReviewLink" href={game.metacritic_url}>{game.name}</a>
      <a className="gameDetail__steamGameLink" href={steamGameLink}>TBD</a>
    </div>
  )
};

export default GameDetail;
