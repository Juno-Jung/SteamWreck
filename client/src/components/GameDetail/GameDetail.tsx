import React, { FunctionComponent  } from 'react';
import Gallereact from 'gallereact';
import Game from '../../Game';
import './GameDetail.scss'
import GameLinks from '../GameLinks';
import GameTags from '../GameTags';

interface Props {
  location: any // not sure what type this is??
};

const GameDetail: FunctionComponent<any> = (props) => {
  const game: Game = props.location.state;

  const screenshots = game.screenshots.map( srnShot => {
    // add an image prop to each screenshot
    return {...srnShot, image : srnShot.path_full}
  });


  const htmlDesc = { __html: game.description_steam};

  return (
    <div className="gameDetail">

      <h1 className="gameDetail__name">{game.name}</h1>
      <div className="gameDetail__screenshots">
        <Gallereact images={screenshots} displayPreview={true} />
      </div>
      <div className="linksAndTags">
        <GameLinks game={game}/>
        <GameTags tags={game.tags}/>
      </div>
      <div className="gameDetail__longDescription" dangerouslySetInnerHTML={htmlDesc}></div>


    </div>
  )
};

export default GameDetail;
