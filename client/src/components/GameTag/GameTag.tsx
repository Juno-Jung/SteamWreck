import React, { FunctionComponent  } from 'react';
import './GameTag.scss';

interface Props {
  tag: string;
}

const GameTag: FunctionComponent<Props> = (props) => {
  return (
    <div className="tag">
      {props.tag}
    </div>
  )
};

export default GameTag;
