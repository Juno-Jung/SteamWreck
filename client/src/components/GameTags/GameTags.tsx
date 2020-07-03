import React, { FunctionComponent  } from 'react';

interface Props {
  tags: [string],
}

const GameTags: FunctionComponent<Props> = (props) => {
  return (
    <div className="tags">{props.tags.join('--')}</div>
  )
};

export default GameTags;
