import React, { FunctionComponent  } from 'react';
import './GameTags.scss';
import GameTag from '../GameTag'

interface Props {
  tags: [string],
}

const GameTags: FunctionComponent<Props> = (props) => {
  return (
    <>
      {props.tags.map( tag => {
        return <GameTag tag={tag}/>
      })}
    </>
  )
};

export default GameTags;
