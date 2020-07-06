import React, { FunctionComponent  } from 'react';
import htmlToFormattedText from "html-to-formatted-text";
import Gallereact from 'gallereact';
import Game from '../../Game';
import './GameDetail.scss'
const BASE_URL = 'https://store.steampowered.com/app';

interface Props {
  location: any // not sure what type this is??
};

const GameDetail: FunctionComponent<any> = (props) => {
  const game: Game = props.location.state;

  console.log('URL=',game.metacritic_url);
  console.log('screenshots=');





  const screenshots = game.screenshots.map( e => {
    return {...e, image : e.path_full}
  });


  const images: any = [];
  game.screenshots.forEach( (e) => {
    images.push({image : e.path_full})
  });

  console.log(images);


  const steamGameLink = `${BASE_URL}/${game.appid}`

  const htmlDesc = { __html: game.description_steam}
  return (
    <div className="gameDetail">

      <h1 className="gameDetail__name">{game.name}</h1>
      <div className="gameDetail__screenshots">
        <Gallereact images={images} displayPreview={true} />
      </div>





      <div className="gameDetail__longDescription" dangerouslySetInnerHTML={htmlDesc}></div>

      <a className="gameDetail__metricCriticReviewLink" href={game.metacritic_url}>{game.name}</a>
      <a className="gameDetail__steamGameLink" href={steamGameLink}>TBD</a>
    </div>
  )
};

export default GameDetail;
