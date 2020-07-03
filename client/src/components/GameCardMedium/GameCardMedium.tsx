import React, { FunctionComponent } from "react";
import "./GameCardMedium.scss";
import Game from "./../../Game";
import Collapsible from "react-collapsible";
const htmlToText = require("html-to-text");

type GameCardMediumProps = {
  //
};

interface Props {
  recGame: Game;
}

const GameCardMedium: FunctionComponent<Props> = (props) => {
  function changeBackground(e: any) {
    e.target.background = "red";
  }
  return (
    <div>
      <Collapsible
        onMouseOver={changeBackground}
        className="collapse"
        trigger={<h1>{props.recGame.name}</h1>}
      >
        <img
          className="gameImgsmall"
          src={`${props.recGame.background_image}`}
        ></img>
        <div className="subDetailsMedium">
          <div className="rating">
            Rating:{" "}
            <span className="ratingNumber">{props.recGame.rating * 100}</span>
          </div>
          <div className="reason">
            Wreck Reasoning:{" "}
            <span className="reasonTxt">{props.recGame.rating_reason}</span>
          </div>
          <Collapsible className="collapse" trigger="Description">
            <div className="description">
              {htmlToText.fromString(props.recGame.description)}
            </div>
          </Collapsible>
          <div className="tags">TAGS:{props.recGame.tags}</div>
        </div>
      </Collapsible>
    </div>
  );
};

export default GameCardMedium;
