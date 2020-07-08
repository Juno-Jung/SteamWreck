import React, { FunctionComponent  } from 'react';
import Recommendation from '../../Recommendation';
import addToFavsImg from '../../images/btn-add.svg';
import removeFromFavsImg from '../../images/btn-added.svg';
import './FavouritePicker.scss'

interface Props {
  recGame: Recommendation;
  addRemoveFav: Function;
};

const FavouritePicker: FunctionComponent<Props> = (props) => {
  const selectorImageToUse =
  (props.recGame.isFav) ? removeFromFavsImg : addToFavsImg;

  return (

    <div className="favouritePicker">
      {/*<div className="favouritePicker__label">Add to favorites:</div>*/}
      <img
        src={selectorImageToUse}
        onClick={() => {props.addRemoveFav(props.recGame)}}
        className='favouritePicker__favIcon'
        alt={'game-favourite-pick-toggle'}/>
    </div>
  )
};

export default FavouritePicker;
