import React, { FunctionComponent  } from 'react';
import './GameTags.scss';

interface Props {
  tags: [string],
}

const GameTags: FunctionComponent<Props> = (props) => {
  return (
    <div className="tags">{props.tags.join('--')}</div>
  )
};

export default GameTags;
