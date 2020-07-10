import React, { FunctionComponent, useState } from "react";
import RecommendationReason from "../RecommendationReason";
import GameTags from "../GameTags";
import GameDescription from "../GameDescription";
import FavouritePicker from "../FavouritePicker";
import { useSpring, animated as a } from "react-spring";
import GameRating from '../GameRating';

import { Link } from 'react-router-dom';

import "./GameCardLarge.scss";
import Game from "../../../types/Game";
import { Z_FIXED } from "zlib";

interface Props {
  // Top Recommended Game.
  recGame: Game;
  addRemoveFav: Function;
}

const GameCardLarge: FunctionComponent<Props> = (props) => {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(0px) rotateX(${flipped ? 360 : 0}deg)`,
    config: { mass: 50, tension: 200, friction: 200 },
  });
  const linkContent = {
    pathname: `/game/${props.recGame.appid}`,
    // pass the game as state for the link
    state: props.recGame,
  };
  return (
    <div>
      <Link to={linkContent}>
        <h1 className="nameLarge">{props.recGame.name} </h1>
      </Link>
      <div className="allDetailsLarge">
        <div className="mainDetailsLarge">
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

        <div className="subDetailsLarge">
          <div className="rating">
            Rating:{" "}
            <span className="ratingNumber">{`${(
              100 * props.recGame.rating
            ).toFixed(0)} / 100`}</span>
          </div>
          <RecommendationReason reasoning={props.recGame.rating_reason} />
          <GameDescription recGame={props.recGame} />
          <GameTags tags={props.recGame.tags} />
        </div>
      </div>
    </div>
  );
};

export default GameCardLarge;
