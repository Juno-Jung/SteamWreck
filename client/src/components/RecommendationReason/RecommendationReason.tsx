import React, { FunctionComponent  } from 'react';

interface Props {
  reasoning: string;
}

const RecommendationReason: FunctionComponent<Props> = (props) => {
  return (
    <div className="reason"><span className="reason__label">Wreck Reasoning:</span> <span className="reasonTxt">{props.reasoning}</span></div>
  )
};

export default RecommendationReason;
