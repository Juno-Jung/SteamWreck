import React, { FunctionComponent  } from 'react';
import Recommendation from '../../Recommendation';

interface Props {
  //appId: number;
  recGame: Recommendation;
  addRemoveFav: Function;
};

const FavouritePicker: FunctionComponent<Props> = (props) => {
  return <div onClick={() => {props.addRemoveFav(props.recGame)}}>{props.recGame.appid}</div>;

  // image here..

  // click handler on image...



};

export default FavouritePicker;
