import React, { FunctionComponent  } from 'react';
import Game from '../../Game';
import './GameDetail.scss'


interface Props {
  location: any // not sure what type this is??
};

const GameDetail: FunctionComponent<any> = (props) => {
  const game: Game = props.location.state;
  return (
    <div className="gameDetail">

      <h1 className="gameDetail__name">{game.name}</h1>
      <div className="gameDetail__screenshots">
          screenshots component to go here
      </div>


      <div className="gameDetail__longDescription">{game.description_steam}</div>


      <div className="gameDetail__reviewLink">{game.appid}</div>
    </div>
  )
};

export default GameDetail;
