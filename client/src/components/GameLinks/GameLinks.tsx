import React, { FunctionComponent } from 'react';
import Game from '../../../types/Game';
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
      <div className="gamelinks__label">Links</div>
      <a href={props.game.metacritic_url} target="_blank">
        <div className="gamelinks__metacriticlink">
          <div>Metacritic</div>
          <img className="gamelinks__metacriticlink__img" src={metacriticLogo} alt="" />
        </div>
      </a>
      <a href={steamGameLink} target="_blank">
        <div className="gamelinks__steamlink">
          <div>Steam</div>
          <img className="gamelinks__steamlink__img" src={steamLogo} alt="" />
        </div>
      </a>
    </div>

  )
};

export default GameLinks;


