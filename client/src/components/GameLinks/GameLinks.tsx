import React, { FunctionComponent  } from 'react';
import Game from '../../Game';
import './GameLinks.scss';
import steamLogo from '../../images/1200px-Breezeicons-apps-48-steam_v2.png';
import metacriticLogo from '../../images/1200px-Metacritic_logo_original.png'

const STEAM_BASE_URL = 'https://store.steampowered.com/app';

interface Props {
  game: Game
};

const GameLinks: FunctionComponent<Props> = (props) => {
  const steamGameLink = `${STEAM_BASE_URL}/${props.game.appid}`;
  return (

    <div className="gamelinks">
        <a href={props.game.metacritic_url} target="_blank">
          <div className="gamelinks__metacriticlink">
            <h3>Metacritic Review</h3>
            <img className="gamelinks__metacriticlink__img" src={metacriticLogo} alt=""/>
          </div>
        </a>
        <a href={steamGameLink} target="_blank">
          <div className="gamelinks__steamlink">
            <h3>Game on Steam</h3>
            <img className="gamelinks__steamlink__img" src={steamLogo} alt=""/>
          </div>
        </a>
    </div>

  )
};

export default GameLinks;


