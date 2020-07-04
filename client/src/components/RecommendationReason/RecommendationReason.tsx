import React, { FunctionComponent  } from 'react';

interface Props {
  reasoning: string;
}

const RecommendationReason: FunctionComponent<Props> = (props) => {
  return (
    <div className="reason">Wreck Reasoning: <span className="reasonTxt">{props.reasoning}</span></div>
  )
};

export default RecommendationReason;
