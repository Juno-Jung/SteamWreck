import React, { FunctionComponent } from 'react';
const htmlToText = require("html-to-text");

interface Props {
  description: string,
}

const GameDescription: FunctionComponent<Props> = (props) => {
  return (
    <div className="description">{htmlToText.fromString(props.description)}</div>
  )
};


export default GameDescription;
