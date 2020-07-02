import React, { FunctionComponent  } from 'react';
import './UserSummary.scss';

const WORLD_FLAGS_URL: string = process.env.REACT_APP_WORLD_FLAGS_URL || 'https://www.countryflags.io';

type UserSummaryProps = {
username:string,
countrycode:string,
avatarfull:string,
};




const UserSummary: React.FC<UserSummaryProps> = (props) => {
  return (
  
      <div className="container">
        <img className="avatarFull" src={props.avatarfull}/>
        <div className="personaName">{props.username}</div>
        <img className="countryFlag" src={`${WORLD_FLAGS_URL}/${props.countrycode}/shiny/32.png`}></img>
      </div> 
  
  )

};

export default UserSummary;
