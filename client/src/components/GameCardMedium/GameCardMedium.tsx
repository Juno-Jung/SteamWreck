import React, { FunctionComponent , useState} from 'react';
import { Link } from 'react-router-dom';
import RecommendationReason from './../RecommendationReason'
import GameTags from '../GameTags'
import GameDescription from '../GameDescription'
import FavouritePicker from '../FavouritePicker';
import { useSpring, animated as a, interpolate } from "react-spring";

import GameRating from '../GameRating';

import './GameCardMedium.scss'
import Game from '../../Game'

interface Props {
  recGame: Game;
  addRemoveFav: Function;
}

const GameCardMedium: FunctionComponent<Props> = (props) => {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(0px) rotateX(${flipped ? 360 : 0}deg)`,
    config: { mass: 50, tension: 100, friction: 100 },
  });

  const linkContent = {
    pathname: `/game/${props.recGame.appid}`,
    // pass the game as state for the link
    state: props.recGame
  }

  return (
    <div>
      <Link to={linkContent}><h1 className="nameMedium text--hover">{props.recGame.name} </h1></Link>
      <div className ="allDetailsMedium">
        <div className="mainDetailsMedium">
        <a.img
              src={props.recGame.background_image}
              class="gameImg"
              style={{
                opacity: 1,
                transform: transform,
              }}
            />

                <div onClick={() => set((state) => !state)}>
            <a.div>
              <FavouritePicker
                recGame={props.recGame}
                addRemoveFav={props.addRemoveFav}
              />
            </a.div>
          </div>
        </div>

        <div className ="subDetailsMedium">
          <GameRating game={props.recGame}/>
          <RecommendationReason reasoning={props.recGame.rating_reason}/>
          <GameDescription recGame={props.recGame}/>
          <GameTags tags={props.recGame.tags}/>
        </div>
      </div>

    </div>
  )
};


export default GameCardMedium;
