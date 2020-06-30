import React, { FunctionComponent  } from 'react';
import './UserSummary.scss';

const WORLD_FLAGS_URL: string = process.env.REACT_APP_WORLD_FLAGS_URL || 'https://www.countryflags.io';

type UserSummaryProps = {
  //
};

interface userObj {
  favourites: [];
  personaname: string;
  avatarfull: string;
  countrycode: string;
}

const user: userObj = JSON.parse('{ "personaname": "Test", "countrycode": "CA", "avatarfull": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ec/ecd7f7410cb1c7f59b62bf2355df6269ab8b14e1_full.jpg" }');

const UserSummary: FunctionComponent = () => {
  return (
    <>
      <div className="container">
        <img className="avatarFull" src={user.avatarfull}/>
        <div className="personaName">{user.personaname}</div>
        <img className="countryFlag" src={`${WORLD_FLAGS_URL}/${user.countrycode}/shiny/32.png`}></img>
      </div>
    </>
  )

};

export default UserSummary;
